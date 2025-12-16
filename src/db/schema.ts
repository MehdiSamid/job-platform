import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Table des postes d'emploi
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // full-time, part-time, contract, internship
  location: varchar("location", { length: 255 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  salary: varchar("salary", { length: 100 }),
  postedAt: timestamp("posted_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  isActive: integer("is_active").default(1).notNull(), // 1 = active, 0 = inactive
});

// Table des candidatures
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  resumeUrl: text("resume_url").notNull(), // URL du fichier PDF
  message: text("message"),
  status: varchar("status", { length: 50 }).default("pending").notNull(), // pending, reviewed, accepted, rejected
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

// Type pour les insertions
export type InsertJob = typeof jobs.$inferInsert;
export type Job = typeof jobs.$inferSelect;

export type InsertApplication = typeof applications.$inferInsert;
export type Application = typeof applications.$inferSelect;
