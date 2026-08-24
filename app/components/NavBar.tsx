"use client"; 

import Link from "next/link"; // Asegúrate de que Link esté importado
import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink
            href="/"
            disableActive
            className="text-lg font-bold tracking-tight"
          >
            Blog App
          </NavLink>
          <NavLink href="/blogs">blogs</NavLink>
          <NavLink href="/me/reading-list" className="text-sm">reading list</NavLink>
          <NavLink href="/users">users</NavLink>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/blogs/new"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                + New Blog
              </Link>

              
              <Link 
                href="/me" 
                aria-label="me"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                <span className="hidden sm:inline">
                  Hello, <span className="font-semibold text-zinc-900 dark:text-zinc-100">{session.user?.name}</span>
                </span>
                <span className="sm:hidden">Hello, {session.user?.name}</span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                register
              </Link>
              
              <Link
                href="/login"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}