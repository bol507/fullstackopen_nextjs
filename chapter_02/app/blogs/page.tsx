import Link from "next/link";
import { searchBlogs } from "../services/blogs";
import SearchForm from "./SearchForm";

interface BlogsPageProps {
  searchParams: Promise<{ 
    important?: string;
    filter?: string;
  }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  
  const { important, filter }  = await searchParams 
  const allBlogs = searchBlogs(filter || "");
  const showImportant = important === "true";
  const blogs = showImportant ? allBlogs.filter((blog) => blog.likes > 10) : allBlogs;
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <div className="flex flex-1 w-full max-w-3xl flex-col rounded-2xl border border-zinc-200/60 bg-white py-16 px-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-16">
        
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Blogs
        </h1>

        <div className="mb-8">
          <SearchForm initialValue={filter || ""} />
        </div>

        <Link 
          href={showImportant ? "/blogs" : "/blogs?important=true"}
          className="mb-10 inline-flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
        >
          {showImportant ? "Show all" : "Show important only"}
        </Link>
        
        <ul className="flex flex-col gap-6">
          {blogs.map(blog => (
            <li 
              key={blog.id}
              className="group rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm dark:border-zinc-800/60 dark:bg-zinc-800/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                <Link 
                  href={`/blogs/${blog.id}`}
                  className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  {blog.title}
                </Link>
              </h2>
              <p className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                By {blog.author}
              </p>
              <p className="mb-1 text-sm text-zinc-600 dark:text-zinc-400">
                URL: <a 
                  href={blog.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                  {blog.url}
                </a>
              </p>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Likes: {blog.likes}
              </p>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
}