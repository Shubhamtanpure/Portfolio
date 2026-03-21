import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import MuiProvider from "@/components/providers/MuiProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Shubham Tanpure — Full-Stack Developer | SaaS · AI · IoT Systems",
    template: "%s | Shubham Tanpure",
  },
  description:
    "Full-Stack Developer specializing in industrial SaaS, real-time systems, microservices, and AI/IoT integration. Building scalable manufacturing software at Elansol Technologies.",
  keywords: [
    "Full Stack Developer",
    "SaaS Developer",
    "React",
    "Next.js",
    "NestJS",
    "Kafka",
    "WebSockets",
    "IoT",
    "Industrial Software",
    "Microservices",
    "Real-time Systems",
    "Pune",
    "India",
  ],
  authors: [{ name: "Shubham Tanpure", url: "https://shubhamtanpure.dev" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shubhamtanpure.dev",
    siteName: "Shubham Tanpure",
    title: "Shubham Tanpure — Full-Stack Developer",
    description:
      "Building real-time, scalable industrial systems with AI & microservices.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shubham Tanpure Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Tanpure — Full-Stack Developer",
    description:
      "Building real-time, scalable industrial systems with AI & microservices.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read cookie server-side — zero flash, SSR-safe
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "dark";

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <MuiProvider initialMode={theme}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}
