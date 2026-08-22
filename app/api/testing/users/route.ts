import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

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
    const { username, name, password } = body;

    if (!username || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields: username, name, password" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db
      .insert(users)
      .values({
        username: username.trim(),
        name: name.trim(),
        passwordHash,
      })
      .onConflictDoUpdate({
        target: users.username,
        set: { 
          name: name.trim(), 
          passwordHash 
        },
      })
      .returning();

    const user = result[0];

    return NextResponse.json({
      id: user.id,
      username: user.username,
      name: user.name,
      message: "Test user created/updated successfully",
    }, { status: 201 });
    
  } catch (error) {
    console.error("[API POST /testing/users] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const protectedResponse = checkProduction();
  if (protectedResponse) return protectedResponse;

  try {
    const allUsers = await db.select().from(users);
    
    
    const safeUsers = allUsers.map(user => ({
      id: user.id,
      username: user.username,
      name: user.name,
    }));

    return NextResponse.json({
      users: safeUsers,
      count: safeUsers.length,
    });
    
  } catch (error) {
    console.error("[API GET /testing/users] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}