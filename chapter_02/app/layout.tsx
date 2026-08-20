import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link"
import { auth } from "@/auth";
import SessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "A blog application built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-zinc-50 antialiased dark:bg-zinc-950`}
    >
      <body className="min-h-full flex flex-col font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
        <SessionProvider session={session}>

          <NavBar />

          <main style={{ padding: "20px" }}>{children}</main>

        </SessionProvider>

      </body>
    </html>
  );
}