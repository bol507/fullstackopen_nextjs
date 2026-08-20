import { pgTable, serial, text, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url"),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").references(() => users.id),
});