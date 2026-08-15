import { createBlog } from "../../actions/blogs";

export default function NewBlogPage() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <div className="flex flex-1 w-full max-w-3xl flex-col rounded-2xl border border-zinc-200/60 bg-white py-16 px-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-16">
        
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Create New Blog
        </h1>
        
        <form action={createBlog} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="title" 
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Title:
            </label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required 
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="author" 
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Author:
            </label>
            <input 
              type="text" 
              id="author" 
              name="author" 
              required 
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="url" 
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              URL:
            </label>
            <input 
              type="url" 
              id="url" 
              name="url" 
              required 
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            />
          </div>
          
          <button 
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900 sm:w-fit"
          >
            Create Blog
          </button>
          
        </form>
        
      </div>
    </div>
  );
}