import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-zinc-50 px-4 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/60 bg-white p-12 text-center shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900">
        
        <div className="mb-6 text-6xl">🔍</div>
        
        <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Error 404
        </div>
        
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Page not found
        </h1>
        
        <p className="mb-8 text-base text-zinc-600 dark:text-zinc-400">
          We couldn't find the page you're looking for.
        </p>
    
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          ← go back home
        </Link>
        
      </div>
    </div>
  );
}