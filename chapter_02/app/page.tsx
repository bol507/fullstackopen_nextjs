import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-4 w-full">
          <h1 className="text-4xl font-bold">Welcome to Blog App</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Discover and share interesting articles</p>
          <Link
            href="/blogs"
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Blogs
          </Link>
        </div>
      </main>
    </div>
  );
}
