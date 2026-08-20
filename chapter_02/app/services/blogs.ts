import { db } from "../../db";
import { blogs, users } from "../../db/schema";
import { eq, desc, ilike } from "drizzle-orm";


export const getBlogs = async() => {
    return await db.select().from(blogs).orderBy(desc(blogs.likes));
}

export const getBlog = async(id: number) => {
  const result = await db.select().from(blogs).where(eq(blogs.id, id));
  return result[0];
};

export const addBlog = async(title: string, author: string, url: string, userId: number) => {

  

  const result = await db.insert(blogs).values({
    title,
    author,
    url,  
    likes: 0,
    userId
  }).returning();
  return result[0];
};

export const likeBlog = async (id: number) => {
  const blog = await getBlog(id);
  if (!blog) throw new Error("Blog not found");
  const result = await db.update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))
    .returning();
  return result[0];
}

export const searchBlogs = (query: string) => {
  if (!query || query.trim() === "") {
    return getBlogs();
  }
  const searchTerm = `%${query.trim()}%`;
  return db
    .select()
    .from(blogs)
    .where(ilike(blogs.title, searchTerm))
    .orderBy(desc(blogs.likes));
};