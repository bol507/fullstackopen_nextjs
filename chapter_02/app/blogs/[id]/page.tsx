import  { notFound } from "next/navigation";
import { getBlog } from "../../services/blogs";
import { likeBlogAction } from "../../actions/blogs";

interface BlogPageProps {
    params: {
        id: string;
    }
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { id } = await params;
    const blogId = parseInt(id as string);
    const blog = getBlog(blogId);

    if (!blog) {
        return notFound();
    }

    return (
        <div >
            <h1>{blog.title}</h1>
            <p><strong>Author:</strong> {blog.author}</p>
            <p>
                <strong>URL:</strong>{" "} 
                <a href={blog.url} target="_blank" rel="noopener noreferrer">
                    {blog.url}
                </a>
            </p>
            <p>
                <strong>Likes:</strong> {blog.likes}
            </p>

            <form action={likeBlogAction} >
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit"
                    
                >
                    ❤️ Like ({blog.likes})
                </button>
            </form>
        </div>
    );
}
