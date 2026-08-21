import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { username, name, password } = await request.json();

    if (!username || !name || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username already in use" }, { status: 409 });
    }

    // Hash the password (10 is a good balance of security/performance)
    const passwordHash = await bcrypt.hash(password, 10);


    await db.insert(users).values({
      username,
      name,
      passwordHash,
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}