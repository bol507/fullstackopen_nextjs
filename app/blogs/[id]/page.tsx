import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlog } from "../../services/blogs";
import { likeBlogAction } from "../../actions/blogs";
import { addToReadingListAction, removeFromReadingListAction } from "@/app/actions/readingList";
import { getCurrentUser } from "@/app/services/session";
import { isInReadingList } from "@/app/services/readingList";

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
    const user = await getCurrentUser();

    if (!blog) {
        return notFound();
    }

    const isOwner = user ? blog.userId === user.id : false;
    const inReadingList = user ? await isInReadingList(user.id, blogId) : false;

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-12 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900 sm:px-8">
            <div className="w-full max-w-3xl rounded-2xl border border-zinc-200/60 bg-white px-8 py-12 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-12 sm:py-16">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                        {blog.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">✍️ {blog.author}</span>
                        </span>
                        {isOwner && (
                            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                👤 Your blog
                            </span>
                        )}
                    </div>
                </div>

                {/* Blog Info */}
                <div className="mb-8 space-y-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 dark:border-zinc-800/60 dark:bg-zinc-800/30">
                    
                    {/* URL */}
                    <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            URL
                        </p>
                        {blog.url ? (
                            <a 
                                href={blog.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-zinc-700 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-zinc-900 hover:decoration-zinc-500 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-100 dark:hover:decoration-zinc-400"
                            >
                                {blog.url}
                                <span className="text-xs">↗</span>
                            </a>
                        ) : (
                            <span className="text-sm italic text-zinc-400 dark:text-zinc-500">No URL provided</span>
                        )}
                    </div>

                    {/* Likes */}
                    <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Likes
                        </p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            ❤️ {blog.likes}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    
                   
                    <form action={likeBlogAction} className="flex-1">
                        <input type="hidden" name="id" value={blog.id} />
                        <button 
                            type="submit"
                            data-testid="like-button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
                        >
                            ❤️ Like ({blog.likes})
                        </button>
                    </form>

                    
                    {user && !isOwner && (
                        <form action={inReadingList ? removeFromReadingListAction : addToReadingListAction} className="flex-1">
                            <input type="hidden" name="blogId" value={blog.id} />
                            <button 
                                type="submit"
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors active:scale-[0.98] ${
                                    inReadingList
                                        ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
                                        : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                }`}
                            >
                                {inReadingList ? "📖 En tu lista" : "📑 Agregar a lista"}
                            </button>
                        </form>
                    )}
                </div>

                
                {!user && (
                    <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            <Link href="/login" className="font-semibold text-zinc-900 underline underline-offset-2 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300">
                                Log in to like this blog
                            </Link>{" "}
                             to add it to your reading list.
                        </p>
                    </div>
                )}
                
            </div>
        </div>
    );
}