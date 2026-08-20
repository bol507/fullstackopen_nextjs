"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { getCurrentUser } from "../services/session";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

 
  if (!title || !author || !url) {
    throw new Error("Missing required fields");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
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