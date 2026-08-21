import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return await db.select().from(users);
};

export const getUserWithBlogs = async (username: string) => {
  const result = await db.query.users.findFirst({
    where: eq(users.username, username),
    with:{
      blogs: true,
    }
  });
  return result;
}

export const getUserById = async (id: number) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
};

export const updateUserToken = async (userId: number, token: string | null) => {
  const result = await db
    .update(users)
    .set({ token })
    .where(eq(users.id, userId))
    .returning();
  return result[0];
};