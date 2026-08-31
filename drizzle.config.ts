import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"
import * as fs from "fs"

const envFile = fs.existsSync(".env.test") ? ".env.test" : ".env.local";

dotenv.config({ path: envFile });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
