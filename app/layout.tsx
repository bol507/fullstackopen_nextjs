import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { auth } from "@/auth";
import SessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import { NotificationProvider } from "./components/NotificationContext";
import Notification from "./components/Notification";

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
          <NotificationProvider>
            <NavBar />
            <div className="fixed top-1 right-4 z-50 w-full max-w-sm">
              <Notification />
            </div>
            <main className="flex-1 overflow-y-auto ">{children}</main>
          </NotificationProvider>
        </SessionProvider>

      </body>
    </html>
  );
}