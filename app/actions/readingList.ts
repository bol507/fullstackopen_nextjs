"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addToReadingList, removeFromReadingList, toggleReadStatus } from "../services/readingList";
import { getCurrentUser } from "../services/session";

export async function addToReadingListAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const blogId = parseInt(formData.get("blogId") as string);
  if (isNaN(blogId)) throw new Error("Invalid blog ID");

  await addToReadingList(user.id, blogId);
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me/reading-list");
}

export async function removeFromReadingListAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const blogId = parseInt(formData.get("blogId") as string);
  if (isNaN(blogId)) throw new Error("Invalid blog ID");

  await removeFromReadingList(user.id, blogId);
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me/reading-list");
}

export async function toggleReadStatusAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const blogId = parseInt(formData.get("blogId") as string);
  if (isNaN(blogId)) throw new Error("Invalid blog ID");

  await toggleReadStatus(user.id, blogId);
  revalidatePath("/me/reading-list");
}