import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCurrentUser = async () => {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

   return {
    id: Number(session.user.id), 
    name: session.user.name,
    username: session.user.username,
    token: session.user.token ?? null,
  };
};