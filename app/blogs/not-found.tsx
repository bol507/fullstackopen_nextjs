export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <div className="flex w-full max-w-lg flex-col items-center rounded-2xl border border-zinc-200/60 bg-white px-8 py-20 text-center shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-16">
        
        <h1 className="text-6xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-7xl">
          404 - Blog Not Found
        </h1>
        
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          The blog you are looking for does not exist.
        </p>
        
        <a 
          href="/blogs" 
          className="mt-10 inline-flex items-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
        >
          Go back to blogs
        </a>
        
      </div>
    </div>
  );
}