import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "../../services/session";
import { getReadingList } from "../../services/readingList";
import { toggleReadStatusAction, removeFromReadingListAction } from "../../actions/readingList";

export default async function ReadingListPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user.id);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 px-4 py-12 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            📚 My reading list
          </h1>
          <Link
            href="/me"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to my profile
          </Link>
        </div>

        {/* Empty State */}
        {readingList.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200/60 bg-white p-12 text-center shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900">
            <div className="mb-4 text-5xl">📭</div>
            <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
              You don't have any blogs in your reading list
            </p>
            <Link
              href="/blogs"
              className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Explore blogs
            </Link>
          </div>
        ) : (
          /* List of Blogs */
          <div className="flex flex-col gap-4">
            {readingList.map((entry) => (
              <div
                key={entry.id}
                className={`group rounded-xl border p-6 shadow-sm transition-all hover:shadow-md ${
                  entry.read
                    ? "border-emerald-200/60 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-900/10"
                    : "border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-900"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  
                  {/* Blog info  */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/blogs/${entry.blog.id}`}
                        className={`text-xl font-bold tracking-tight transition-colors ${
                          entry.read
                            ? "text-zinc-500 line-through decoration-zinc-400 dark:text-zinc-500 dark:decoration-zinc-600"
                            : "text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
                        }`}
                      >
                        {entry.blog.title}
                      </Link>
                      {entry.read && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                          ✅ Read
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center sm:gap-3">
                      <span>✍️ {entry.blog.author}</span>
                      <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
                      <span>
                        📅 Added: {new Date(entry.addedAt).toLocaleDateString('en-EN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex flex-col gap-2 sm:min-w-[160px]">
                    <form action={toggleReadStatusAction}>
                      <input type="hidden" name="blogId" value={entry.blog.id} />
                      <button
                        type="submit"
                        className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          entry.read
                            ? "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                            : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        }`}
                      >
                        {entry.read ? "Mark as unread" : "✅ Mark as read"}
                      </button>
                    </form>

                    <form action={removeFromReadingListAction}>
                      <input type="hidden" name="blogId" value={entry.blog.id} />
                      <button
                        type="submit"
                        className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      >
                        🗑️ Delete
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}