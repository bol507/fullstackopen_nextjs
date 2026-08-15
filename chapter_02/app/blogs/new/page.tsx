import { createBlog } from "../../actions/blogs";

export default function NewBlogPage() {
  return (
    <div>
      <h1>Create New Blog</h1>
      <form action={createBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input type="url" id="url" name="url" required />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}