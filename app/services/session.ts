import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCurrentUser = async () => {
  const session = await auth();
  
  if (!session?.user?.id) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, parseInt(session.user.id, 10)),
  });

  return user || null;
};