import Link from "next/link";
import { getUsers } from "../services/users";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <div className="flex flex-1 w-full max-w-3xl flex-col rounded-2xl border border-zinc-200/60 bg-white py-16 px-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-16">
        
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Users
        </h1>

        <ul className="flex flex-col gap-6">
          {users.map(user => (
            <li 
              key={user.id}
              className="group rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm dark:border-zinc-800/60 dark:bg-zinc-800/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                <Link 
                  href={`/users/${user.username}`}
                  className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  {user.name}
                </Link>
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Username: <span className="font-medium text-zinc-700 dark:text-zinc-300">@{user.username}</span>
              </p>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
}