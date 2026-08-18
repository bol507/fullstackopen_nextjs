import { getBlogs } from "../services/blogs";
import Link from "next/link";


export default async function BlogsPage({searchParams}: {
  searchParams: Promise<{ important?: string }>;
}) {
  const allBlogs = getBlogs();
  const { important }  = await searchParams 

  const showImportant = important === "true";
  const blogs = showImportant ? allBlogs.filter((blog) => blog.likes > 10) : allBlogs;
  return (
    <div>
      <h1>Blogs</h1>
      <Link href={showImportant ? "/blogs" : "/blogs?important=true"}>
        {showImportant ? "Show all" : "Show important only"}
      </Link>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h2>
              <Link href={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </h2>
            <p>By {blog.author}</p>
            <p>URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <p>Likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}