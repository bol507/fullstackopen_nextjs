import MDXWrapper from "./components/MDXWrapper";

export const metadata = {
  title: "Bienvenido a Blog App",
  description: "Comparte tus ideas y descubre contenido increíble",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-12">
        
        <article className="rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900 sm:p-12 prose prose-zinc dark:prose-invert max-w-4xl mx-auto">
          <MDXWrapper />
        </article>
        
      </div>
    </div>
  );
}