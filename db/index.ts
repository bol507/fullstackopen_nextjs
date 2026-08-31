import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import * as fs from "fs";

const envFile = fs.existsSync(".env.test") ? ".env.test" : ".env.local";
dotenv.config({ path: envFile });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({
  client: sql,
  schema,
});