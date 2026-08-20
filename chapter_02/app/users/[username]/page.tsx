import { notFound } from "next/navigation";
import Link from "next/link";
import { getUserWithBlogs } from "../../services/users";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      <div className="flex flex-1 w-full max-w-3xl flex-col rounded-2xl border border-zinc-200/60 bg-white py-16 px-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:px-16">
        
        {/* Encabezado del Usuario */}
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          {user.name}
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-10">
          Username: <span className="font-medium text-zinc-700 dark:text-zinc-300">@{user.username}</span>
        </p>
        
        {/* Sección de Blogs */}
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
          Blogs by {user.name}
        </h2>

        {user.blogs.length === 0 ? (
          <p className="text-center text-zinc-500 dark:text-zinc-400 italic py-8">
            No blogs yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {user.blogs.map(blog => (
              <li 
                key={blog.id}
                className="group rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm dark:border-zinc-800/60 dark:bg-zinc-800/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  <Link 
                    href={`/blogs/${blog.id}`}
                    className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Likes: {blog.likes}
                </p>
              </li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
}