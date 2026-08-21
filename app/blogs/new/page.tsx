"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createBlog } from "@/app/actions/blogs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/components/NotificationContext";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      data-testid="create-blog-button"
      disabled={pending}
      className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      {pending ? "Creating..." : "Create Blog"}
    </button>
  );
}


const initialState = {
  error: undefined,
  success: false,
  fields: {
    title: "",
    author: "",
    url: "",
  },
};

export default function NewBlogPage() {
  const router = useRouter();
  const [state, action] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state?.success) {
      showNotification("Blog created successfully!", "success");
      router.push("/blogs");
    }
  }, [state?.success, showNotification, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:p-10">
        
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create New Blog
        </h1>

        <form action={action} className="flex flex-col gap-6">
          
          {/* Title Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog title"
              defaultValue={state?.fields?.title || ""}
              required
              minLength={5}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            />
            {/* Error Message  */}
            {state?.errors?.title && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {state.errors.title}
              </p>
            )}
            {/* Hint (Tailwind) */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Minimum 5 characters
            </p>
          </div>

          {/* Author Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="author" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author name"
              defaultValue={state?.fields?.author || ""}
              required
              minLength={5}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            />
            {state?.errors?.author && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {state.errors.author}
              </p>
            )}
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Minimum 5 characters
            </p>
          </div>

          {/* URL Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              placeholder="https://example.com/blog"
              defaultValue={state?.fields?.url || ""}
              required
              minLength={5}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            />
            {state?.errors?.url && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {state.errors.url}
              </p>
            )}
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Minimum 5 characters
            </p>
          </div>

          {/* General Error Message  */}
          {state?.errors?.general && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {state.errors.general}
            </div>
          )}

          {/* Action Buttons Group */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SubmitButton />

            <Link
              href="/blogs"
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
            >
              Cancel
            </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}