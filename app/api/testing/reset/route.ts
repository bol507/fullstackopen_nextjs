import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function DELETE() {
  // Only allow this endpoint in production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is strictly forbidden in production" },
      { status: 403 }
    );
  }

  try {
    
    await db.execute(sql`TRUNCATE TABLE reading_lists RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE blogs RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);

    return NextResponse.json({
      message: "All data has been reset and sequences restarted",
      timestamp: new Date().toISOString(),
    }, { status: 200 });
    
  } catch (error) {
    console.error("[API RESET] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}