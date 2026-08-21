import { pgTable, serial, text, integer, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url"),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const readingLists = pgTable("reading_lists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  blogId: integer("blog_id").references(() => blogs.id).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

//relationships
export const usersRelations = relations(users, ({ many }) => ({
  blogs:many(blogs),
  readingLists: many(readingLists),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields : [blogs.userId ],
    references: [users.id]
  }),
  readingLists: many(readingLists),
}));

export const readingListsRelations = relations(readingLists, ({ one }) => ({
  user: one(users, {
    fields: [readingLists.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingLists.blogId],
    references: [blogs.id],
  }),
}));  