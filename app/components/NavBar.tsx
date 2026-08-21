"use client";

import Link from "next/link";
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
          <NavLink href="/blogs">Blogs</NavLink>
          <NavLink href="/users">Users</NavLink>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* new blog button */}
              <Link
                href="/blogs/new"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                + New Blog
              </Link>

              <span className="hidden text-sm text-zinc-600 dark:text-zinc-400 sm:inline">
                Hello, <span className="font-semibold text-zinc-900 dark:text-zinc-100">{session.user?.name}</span>
              </span>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}