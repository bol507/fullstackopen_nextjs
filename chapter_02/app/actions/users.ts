"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

type RegisterState = {
  error?: string;
} | null;

export async function registerUser(
     prevState: RegisterState, 
     formData: FormData
): Promise<RegisterState> {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;


  if (!username || !name || !password) {
    return { error: "All fields are required" };
  }

  if (username.length < 3) {
    return { error: "The username must be at least 3 characters long" };
  }

  if (password.length < 6) {
    return { error: "The password must be at least 6 characters long" };
  }

 
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    return { error: "Username already exists. Please choose another one." };
  }

  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

 
  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  
  redirect("/login?registered=true");
}