"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/actions/users";
import { useFormStatus } from "react-dom";


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      {pending ? "Creating account..." : "Register"}
    </button>
  );
}

export default function RegisterPage() {
  const [state, action] = useActionState(registerUser, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Create an Account
        </h1>
        
        <form action={action} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              minLength={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              placeholder="johndoe"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              placeholder="John Doe"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {state.error}
            </div>
          )}

          {/* Submit Button */}
          <SubmitButton />
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="font-medium text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            Login here
          </Link>
        </p>
        
      </div>
    </div>
  );
}