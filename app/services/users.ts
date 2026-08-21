import { db } from "../../db";
import { users } from "../../db/schema";
import { eq, count, sql } from "drizzle-orm";
import { readingLists } from "@/db/schema";

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

export const getUserStats = async (userId: number) => {
  const result = await db
    .select({
      total: count(readingLists.id),
      read: sql<number>`COUNT(CASE WHEN ${readingLists.read} = true THEN 1 END)`.mapWith(Number),
    })
    .from(readingLists)
    .where(eq(readingLists.userId, userId));

  const total = result[0]?.total ?? 0;
  const read = result[0]?.read ?? 0;

  return {
    readingListTotal: total,
    readingListRead: read,
    readingListUnread: total - read,
  };
};