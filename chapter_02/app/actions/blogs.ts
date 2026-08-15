"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";

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