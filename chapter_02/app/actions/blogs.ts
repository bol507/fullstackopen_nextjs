"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

 
  if (!title || !author || !url) {
    throw new Error("Todos los campos son obligatorios");
  }

  
  addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  if( isNaN(id)) {
    throw new Error("Invalid blog id");
  }

  const blog = likeBlog(id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  revalidatePath("/blogs");
  redirect("/blogs");
}