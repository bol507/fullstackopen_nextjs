"use server";

import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";
import { getCurrentUser } from "../services/session";
import { redirect } from "next/navigation";

type CreateBlogState = {
  errors?: {
    title?: string;
    author?: string;
    url?: string;
    general?: string;
  };
  success?:boolean;
  fields?: {
    title: string;
    author: string;
    url: string;
  };
} ;

export async function createBlog(
  prevState: CreateBlogState,
  formData: FormData
): Promise<CreateBlogState> {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: CreateBlogState["errors"] = {};

  if (!title || title.trim().length < 5) errors.title = "The title must be at least 5 characters long";
  if (!author || author.trim().length < 5) errors.author = "The author must be at least 5 characters long";
  if (!url || url.trim().length < 5) errors.url = "The URL must be at least 5 characters long";

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      success: false,
      fields: { title, author, url },
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      errors: {
        general: "You must be logged in to create a blog",
      },
      success: false,
      fields: { title, author, url },
    };
  }


  await addBlog(title.trim(), author.trim(), url.trim(), user.id);
  
  return { success: true };

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