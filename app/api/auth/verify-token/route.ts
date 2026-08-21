import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// POST /api/auth/verify-token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    
    if (!token || typeof token !== "string" || token.trim() === "") {
      return NextResponse.json(
        { error: "Request must include a valid token" },
        { status: 400 }
      );
    }


    const user = await db.query.users.findFirst({
      where: eq(users.token, token.trim()),
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/auth/verify-token?token=<token>
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Token is required as query parameter" },
      { status: 400 }
    );
  }

 
  const user = await db.query.users.findFirst({
    where: eq(users.token, token.trim()),
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
    },
  });
}