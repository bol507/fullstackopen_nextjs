"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

type RegisterState = {
  errors?: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
    general?: string;
  };
  fields?: {
    username: string;
    name: string;
    password: string;
    passwordConfirm: string;
  };
};

export async function registerUser(
     prevState: RegisterState, 
     formData: FormData
): Promise<RegisterState> {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string || "";

  const errors: RegisterState["errors"] = {};


  if (!username || username.trim().length < 4) {
    errors.username ="The username must be at least 4 characters long";
  }

  if (username && !/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.username = "The username can only contain letters, numbers and underscores";
  }

  if (!name || name.trim().length < 1) {
    errors.name = "The name must be at least 1 character long";
  }

   if (!password || password.length < 4) {
    errors.password ="The password must be at least 4 characters long" ;
  }

  if (!passwordConfirm || passwordConfirm.length < 4) {
    errors.passwordConfirm = "The password confirmation must be at least 4 characters long";
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = "The passwords don't match";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      fields: { username, name, password, passwordConfirm },
    };
  }

 
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    return {
      errors: {
        general: "something went wrong",
      },
      fields: { username, name, password, passwordConfirm },
    };
  }

  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

 
  try {
    await db.insert(users).values({
      username: username.trim(),
      name: name.trim(),
      passwordHash,
    });
  } catch (error) {
    return {
      errors: {
        general: "something went wrong, please try again",
      },
      fields: { username, name, password, passwordConfirm },
    };
  }

  
  redirect("/login?registered=true");
}