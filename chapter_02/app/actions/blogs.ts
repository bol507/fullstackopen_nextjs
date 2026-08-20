"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { getCurrentUser } from "../services/session";

type CreateBlogState = {
  error?: string;
  fields?: {
    title: string;
    author: string;
    url: string;
  };
} | null;

export async function createBlog(
  prevState: CreateBlogState,
  formData: FormData
): Promise<CreateBlogState> {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

 
  if (!title || title.trim().length < 5) {
    return {
      error: "The title must be at least 5 characters long",
      fields: { title, author, url },
    };
  }

  if (!author || author.trim().length < 5) {
    return {
      error: "The author must be at least 5 characters long",
      fields: { title, author, url },
    };
  }

  if (!url || url.trim().length < 5) {
    return {
      error: "The URL must be at least 5 characters long",
      fields: { title, author, url },
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "You must be logged in to create a blog",
      fields: { title, author, url },
    };
  }

  
  await addBlog(title, author, url, user.id);
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  if( isNaN(id)) {
    throw new Error("Invalid blog id");
  }

  const blog = await likeBlog(id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  revalidatePath("/blogs");
  redirect("/blogs");
}