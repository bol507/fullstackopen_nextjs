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