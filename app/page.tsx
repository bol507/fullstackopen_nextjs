import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen py-4 items-center justify-center bg-zinc-50 px-4 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <main className="flex w-full max-w-3xl flex-col items-center rounded-2xl border border-zinc-200/60 bg-white px-8 py-20 text-center shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-16 sm:py-32">
        
        {/* Título Principal */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          🚀 Welcome to Blog App
        </h1>
        
        {/* Subtítulo */}
        <p className="mb-10 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Share your ideas and discover incredible content
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            📚 View Blogs
          </Link>
          
          <Link
            href="/blogs/new"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            ✍️ Create Blog
          </Link>
          
          <Link
            href="/users"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            👥 View Users
          </Link>
        </div>

        {/* Sección de Características (opcional pero recomendada) */}
        <div className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 dark:border-zinc-800/60 dark:bg-zinc-800/30">
            <div className="mb-2 text-2xl">💡</div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Share Ideas
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Publish your thoughts and knowledge
            </p>
          </div>
          
          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 dark:border-zinc-800/60 dark:bg-zinc-800/30">
            <div className="mb-2 text-2xl">❤️</div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Give Like
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Support the content that inspires you
            </p>
          </div>
          
          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 dark:border-zinc-800/60 dark:bg-zinc-800/30">
            <div className="mb-2 text-2xl">👥</div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Connect
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
               Discover other authors and their stories
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}