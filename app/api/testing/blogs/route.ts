import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import { eq } from "drizzle-orm";

function checkProduction() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Testing endpoints are disabled in production" },
      { status: 403 }
    );
  }
  return null;
}

export async function POST(request: NextRequest) {
  const protectedResponse = checkProduction();
  if (protectedResponse) return protectedResponse;

  try {
    const body = await request.json();
    const { title, author, url, username } = body;

    if (!title || !author || !url || !username) {
      return NextResponse.json(
        { error: "Missing required fields: title, author, url, username" },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      return NextResponse.json(
        { error: `User '${username}' not found. Create the user first.` },
        { status: 404 }
      );
    }

    const result = await db.insert(blogs).values({
      title,
      author,
      url,
      likes: 0,
      userId: user.id,
    }).returning();

    const newBlog = result[0];

    return NextResponse.json({
      id: newBlog.id,
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      userId: newBlog.userId,
      message: "Test blog created successfully",
    }, { status: 201 });
    
  } catch (error) {
    console.error("[API POST /testing/blogs] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}