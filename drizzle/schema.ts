import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Content sections for the website
 * Stores all editable text content with bilingual support
 */
export const contentSections = mysqlTable("content_sections", {
  id: int("id").autoincrement().primaryKey(),
  sectionKey: varchar("section_key", { length: 100 }).notNull().unique(), // e.g., 'hero_title', 'about_description'
  titlePt: text("title_pt"),
  titleEn: text("title_en"),
  contentPt: text("content_pt"),
  contentEn: text("content_en"),
  isActive: boolean("is_active").default(true).notNull(),
  displayOrder: int("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type ContentSection = typeof contentSections.$inferSelect;
export type InsertContentSection = typeof contentSections.$inferInsert;

/**
 * Media files (images and videos)
 * Stores all uploaded media with metadata
 */
export const mediaFiles = mysqlTable("media_files", {
  id: int("id").autoincrement().primaryKey(),
  fileKey: varchar("file_key", { length: 255 }).notNull(), // S3 key
  url: text("url").notNull(), // Public URL
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileType: mysqlEnum("file_type", ["image", "video"]).notNull(),
  mimeType: varchar("mime_type", { length: 100 }),
  fileSize: int("file_size"), // in bytes
  captionPt: text("caption_pt"),
  captionEn: text("caption_en"),
  altTextPt: text("alt_text_pt"),
  altTextEn: text("alt_text_en"),
  section: varchar("section", { length: 100 }), // e.g., 'hero', 'gallery', 'about'
  isActive: boolean("is_active").default(true).notNull(),
  displayOrder: int("display_order").default(0).notNull(),
  uploadedBy: int("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = typeof mediaFiles.$inferInsert;

/**
 * Festival statistics and timeline data
 */
export const festivalStats = mysqlTable("festival_stats", {
  id: int("id").autoincrement().primaryKey(),
  year: varchar("year", { length: 20 }).notNull(), // e.g., '2024', '2018-2020'
  participants: int("participants"),
  titlePt: text("title_pt"),
  titleEn: text("title_en"),
  descriptionPt: text("description_pt"),
  descriptionEn: text("description_en"),
  isActive: boolean("is_active").default(true).notNull(),
  displayOrder: int("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type FestivalStat = typeof festivalStats.$inferSelect;
export type InsertFestivalStat = typeof festivalStats.$inferInsert;

/**
 * Site configuration
 * Global settings for the website
 */
export const siteConfig = mysqlTable("site_config", {
  id: int("id").autoincrement().primaryKey(),
  configKey: varchar("config_key", { length: 100 }).notNull().unique(),
  valuePt: text("value_pt"),
  valueEn: text("value_en"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type SiteConfig = typeof siteConfig.$inferSelect;
export type InsertSiteConfig = typeof siteConfig.$inferInsert;