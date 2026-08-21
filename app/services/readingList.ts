import { db } from "@/db";
import { readingLists } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const addToReadingList = async (userId: number, blogId: number) => {
   const result = await db
    .insert(readingLists)
    .values({ userId, blogId })
    .onConflictDoNothing() 
    .returning();

  
  if (result.length === 0) {
    const existing = await db.query.readingLists.findFirst({
      where: and(
        eq(readingLists.userId, userId),
        eq(readingLists.blogId, blogId)
      ),
    });
    return existing;
  }

  return result[0];
};

export const removeFromReadingList = async (userId: number, blogId: number) => {
  await db.delete(readingLists)
    .where(
      and(
        eq(readingLists.userId, userId),
        eq(readingLists.blogId, blogId)
      )
    );
};

export const getReadingList = async (userId: number) => {
  const result = await db.query.readingLists.findMany({
    where: eq(readingLists.userId, userId),
    with: {
      blog: true,
    },
    orderBy: (readingLists, { desc }) => [desc(readingLists.addedAt)],
  });
  
  return result;
};

export const isInReadingList = async (userId: number, blogId: number) => {
  const result = await db.query.readingLists.findFirst({
    where: and(
      eq(readingLists.userId, userId),
      eq(readingLists.blogId, blogId)
    ),
  });
  
  return !!result;
};

export const toggleReadStatus = async (userId: number, blogId: number) => {
  const entry = await db.query.readingLists.findFirst({
    where: and(
      eq(readingLists.userId, userId),
      eq(readingLists.blogId, blogId)
    ),
  });

  if (!entry) {
    throw new Error("Blog not found in reading list");
  }

  const result = await db.update(readingLists)
    .set({ read: !entry.read })
    .where(
      and(
        eq(readingLists.userId, userId),
        eq(readingLists.blogId, blogId)
      )
    )
    .returning();
  
  return result[0];
};