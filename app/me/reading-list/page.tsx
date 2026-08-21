import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "../../services/session";
import { getReadingList } from "../../services/readingList";
import ReadingListCard, { type ReadingListEntry } from "@/app/components/ReadingListCard";


function SectionHeader({ 
  title, 
  icon, 
  count, 
  accentColor = "zinc" 
}: { 
  title: string; 
  icon: string; 
  count: number;
  accentColor?: "zinc" | "emerald";
}) {
  const badgeColors = accentColor === "emerald"
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
    : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";

  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        <span>{icon}</span>
        {title}
      </h2>
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColors}`}>
        {count} {count === 1 ? "blog" : "blogs"}
      </span>
    </div>
  );
}

export default async function ReadingListPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user.id);
  
  // Agrupar por estado de lectura
  const unreadBlogs = readingList.filter(entry => !entry.read);
  const readBlogs = readingList.filter(entry => entry.read);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 px-4 py-12 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              📚 My reading list
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {readingList.length === 0
                ? "Start building your personal library"
                : `${readingList.length} ${readingList.length === 1 ? "blog" : "blogs"} saved`}
            </p>
          </div>
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
          <div className="space-y-12">
            
            {/* Sección 1: Unread (Prioritaria) */}
            <section>
              <SectionHeader 
                title="Unread" 
                icon="📖" 
                count={unreadBlogs.length} 
                accentColor="zinc"
              />
              
              {unreadBlogs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    🎉 All caught up! You've read everything in your list.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {unreadBlogs.map((entry) => (
                    <ReadingListCard key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </section>

            {/* Sección 2: Read (Archivados) */}
            {readBlogs.length > 0 && (
              <section>
                <SectionHeader 
                  title="Read" 
                  icon="✅" 
                  count={readBlogs.length} 
                  accentColor="emerald"
                />
                
                <div className="flex flex-col gap-4 opacity-90">
                  {readBlogs.map((entry) => (
                    <ReadingListCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}