"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { validatePositiveIntegerId } from "../lib/validators";

export async function createBlog(formData: FormData) {
  const titleValue = formData.get("title");
  const authorValue = formData.get("author");
  const urlValue = formData.get("url");

  // Validate that values are non-empty strings, rejecting null, File, and empty strings
  if (typeof titleValue !== 'string' || titleValue.trim() === '') {
    throw new Error("Title must be a non-empty string");
  }
  if (typeof authorValue !== 'string' || authorValue.trim() === '') {
    throw new Error("Author must be a non-empty string");
  }
  if (typeof urlValue !== 'string' || urlValue.trim() === '') {
    throw new Error("URL must be a non-empty string");
  }

  const title = titleValue.trim();
  const author = authorValue.trim();
  const url = urlValue.trim();

  addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const idValue = formData.get("id");
  const id = validatePositiveIntegerId(typeof idValue === 'string' ? idValue : null);

  const blog = likeBlog(id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  revalidatePath("/blogs");
  redirect("/blogs");
}