import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "../services/session";
import { getUserStats } from "../services/users";
import { generateToken, revokeToken } from "../actions/users";
import TokenManager from "./TokenManager";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const stats = await getUserStats(user.id);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        
        
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {user.name}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              @{user.username}
            </p>
          </div>
        </div>

       
        <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                📚 My reading list
              </h2>
              <div className="mt-2 flex gap-4 text-sm">
                <span className="text-amber-600 dark:text-amber-400">
                  📖 {stats.readingListUnread} to read
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  ✅ {stats.readingListRead} read
                </span>
              </div>
            </div>
            <Link
              href="/me/reading-list"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              See full list
            </Link>
          </div>
        </div>

      
        <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            🔑 API Token
          </h2>

          <TokenManager 
            userId={user.id} 
            currentToken={user.token || null}
            generateTokenAction={generateToken}
            revokeTokenAction={revokeToken}
          />
        </div>
        
      </div>
    </div>
  );
}