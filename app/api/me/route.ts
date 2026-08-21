import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


type AuthResult = 
  | { error: string; status: number }
  | { user: typeof users.$inferSelect };

async function authenticateUser(request: NextRequest): Promise<AuthResult> {
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader) {
    return { error: "Missing Authorization header", status: 401 };
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return { error: "Invalid token format, expected 'Bearer <token>'", status: 401 };
  }

  const token = parts[1];
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  });

  if (!user) {
    return { error: "Invalid or expired token", status: 401 };
  }

  return { user };
}


export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateUser(request);
    
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const userId = authResult.user.id;

   
    const userWithBlogs = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        username: true,
        name: true,
      },
      with: {
        blogs: {
          columns: {
            id: true,
            title: true,
            url: true,
            likes: true,
          }
        }
      }
    });

    if (!userWithBlogs) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: userWithBlogs.id,
      username: userWithBlogs.username,
      name: userWithBlogs.name,
      blogs: userWithBlogs.blogs,
    });
    
  } catch (error) {
    console.error("[API GET /me] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateUser(request);
    
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const user = authResult.user;
    const body = await request.json();
    const { name } = body;

    
    if (name && typeof name === "string" && name.trim().length >= 1) {
      await db
        .update(users)
        .set({ name: name.trim() })
        .where(eq(users.id, user.id));
    }

    
    const updatedUser = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      columns: {
        id: true,
        username: true,
        name: true,
      }
    });

    return NextResponse.json({
      id: updatedUser?.id,
      username: updatedUser?.username,
      name: updatedUser?.name,
    });
    
  } catch (error) {
    console.error("[API POST /me] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}