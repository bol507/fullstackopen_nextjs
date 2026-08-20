import { notFound } from "next/navigation";
import { getBlog } from "../../services/blogs";
import { likeBlogAction } from "../../actions/blogs";

interface BlogPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { id } = await params;
    if (!/^[1-9]\d*$/.test(id)) return notFound();
    
    const blogId = Number(id);
    const blog = await getBlog(blogId);

    if (!blog) {
        return notFound();
    }

    return (
        <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
            <div className="flex flex-1 w-full max-w-3xl flex-col rounded-2xl border border-zinc-200/60 bg-white py-16 px-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-16">
                
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                    {blog.title}
                </h1>
                
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-2">
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Author:</strong> {blog.author}
                </p>
                
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-2">
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">URL:</strong>{" "}
                    {blog.url ? (
                        <a 
                            href={blog.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                        >
                            {blog.url}
                        </a>
                    ) : (
                        <span className="italic text-zinc-400 dark:text-zinc-500">No URL provided</span>
                    )}
                </p>
                
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-10">
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Likes:</strong> {blog.likes}
                </p>

                <form action={likeBlogAction} className="w-full sm:w-fit">
                    <input type="hidden" name="id" value={blog.id} />
                    <button 
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
                    >
                        ❤️ Like ({blog.likes})
                    </button>
                </form>
                
            </div>
        </div>
    );
}