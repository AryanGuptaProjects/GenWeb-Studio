import { pgTable, text, timestamp, uuid, jsonb, integer } from "drizzle-orm/pg-core";

/**
 * Projects table storing overall website project metadata.
 */
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Site Versions table storing visual Puck trees and variation iterations.
 */
export const siteVersions = pgTable("site_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  versionNumber: integer("version_number").notNull().default(1),
  name: text("name").notNull().default("Initial Draft"),
  // Stores serialized Puck Data JSON: { content: [...], root: { props: {} } }
  siteTree: jsonb("site_tree").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type SiteVersion = typeof siteVersions.$inferSelect;
export type NewSiteVersion = typeof siteVersions.$inferInsert;
