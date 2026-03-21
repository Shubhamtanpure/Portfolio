"use server";

import { cookies } from "next/headers";

export async function setThemeCookie(theme: "light" | "dark") {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme, {
    httpOnly: false, // readable by JS if needed
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}
