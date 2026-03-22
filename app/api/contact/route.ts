// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return "Name is required";
  if (!body.email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    return "Invalid email address";
  if (!body.message?.trim()) return "Message is required";
  if (body.message.trim().length < 10)
    return "Message must be at least 10 characters";
  return null;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: Partial<ContactPayload> = await req.json();

    const error = validate(body);
    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body as ContactPayload;

    // ── Nodemailer transporter ──────────────────────────────────────────────
    // Uses Gmail SMTP with an App Password.
    // Set these in your .env.local:
    //   GMAIL_USER=shubhamtanpure8742@gmail.com
    //   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   ← 16-char Google App Password
    //
    // To generate an App Password:
    //   Google Account → Security → 2-Step Verification → App passwords
    //   Select "Mail" + "Other (custom name)" → Generate

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ── Email to you ────────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // sends to yourself
      replyTo: email, // reply goes to sender
      subject: `[Portfolio] ${subject || `Message from ${name}`}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0A0A14;color:#EEEEF5;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#7C73FF,#00D4B8);padding:28px 32px">
            <h1 style="margin:0;font-size:22px;color:#fff;font-weight:800">New Portfolio Message</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px">via shubhamtanpure.dev</p>
          </div>
          <div style="padding:28px 32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#9999BB;font-size:13px;width:100px">From</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#9999BB;font-size:13px">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08)"><a href="mailto:${email}" style="color:#7C73FF">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#9999BB;font-size:13px">Subject</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08)">${
                    subject || "—"
                  }</td></tr>
            </table>
            <div style="margin-top:24px">
              <p style="color:#9999BB;font-size:13px;margin-bottom:10px">Message</p>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:18px;line-height:1.75;white-space:pre-wrap">${message}</div>
            </div>
            <div style="margin-top:28px">
              <a href="mailto:${email}?subject=Re: ${
        subject || `Your message`
      }" style="display:inline-block;background:linear-gradient(135deg,#7C73FF,#00D4B8);color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px">
                Reply to ${name} ↗
              </a>
            </div>
          </div>
        </div>
      `,
      text: `New message from ${name} (${email})\n\nSubject: ${
        subject || "—"
      }\n\n${message}`,
    });

    // ── Auto-reply to sender ────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Shubham Tanpure" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name.split(" ")[0]}! 👋`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0A0A14;color:#EEEEF5;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#7C73FF,#00D4B8);padding:28px 32px">
            <h1 style="margin:0;font-size:22px;color:#fff;font-weight:800">Thanks for reaching out!</h1>
          </div>
          <div style="padding:28px 32px;line-height:1.8">
            <p>Hi ${name.split(" ")[0]},</p>
            <p>Thanks for your message. I've received it and will get back to you within <strong>24–48 hours</strong>.</p>
            <p>In the meantime, feel free to check out my work on <a href="https://github.com/Shubhamtanpure" style="color:#7C73FF">GitHub</a> or connect on <a href="https://linkedin.com/in/shubham-tanpure-184a6720a" style="color:#7C73FF">LinkedIn</a>.</p>
            <p style="margin-top:24px">— Shubham Tanpure<br><span style="color:#9999BB;font-size:13px">Full-Stack Developer · Pune, India</span></p>
          </div>
        </div>
      `,
      text: `Hi ${
        name.split(" ")[0]
      },\n\nThanks for your message — I'll get back to you within 24-48 hours.\n\n— Shubham Tanpure`,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
