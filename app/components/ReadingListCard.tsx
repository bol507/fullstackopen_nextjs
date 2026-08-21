import Link from "next/link";
import { toggleReadStatusAction, removeFromReadingListAction } from "@/app/actions/readingList";

// Tipo para las entradas de la lista de lectura
export type ReadingListEntry = {
  id: number;
  blogId: number;
  userId: number;
  addedAt: Date;
  read: boolean;
  blog: {
    id: number;
    title: string;
    author: string;
    url: string | null;
    likes: number;
    userId: number | null;
    createdAt: Date;
  };
};

export default function ReadingListCard({ entry }: { entry: ReadingListEntry }) {
  return (
    <div
      className={`group rounded-xl border p-6 shadow-sm transition-all hover:shadow-md ${
        entry.read
          ? "border-emerald-200/60 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-900/10"
          : "border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-900"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        
        {/* Blog Info */}
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
            <span className="hidden text-zinc-300 dark:text-zinc-700 sm:inline">•</span>
            <span>
              📅 Added: {new Date(entry.addedAt).toLocaleDateString('en-EN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
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
  );
}