import { eq, desc, and } from "drizzle-orm";
import { 
  contentSections, 
  InsertContentSection,
  mediaFiles,
  InsertMediaFile,
  festivalStats,
  InsertFestivalStat,
  siteConfig,
  InsertSiteConfig
} from "../drizzle/schema";
import { getDb } from "./db";

// ============ Content Sections ============

export async function getAllContentSections() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(contentSections)
    .where(eq(contentSections.isActive, true))
    .orderBy(contentSections.displayOrder);
}

export async function getContentSectionByKey(sectionKey: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(contentSections)
    .where(eq(contentSections.sectionKey, sectionKey))
    .limit(1);
    
  return result[0] || null;
}

export async function createContentSection(data: InsertContentSection) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(contentSections).values(data);
}

export async function updateContentSection(id: number, data: Partial<InsertContentSection>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(contentSections)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(contentSections.id, id));
}

export async function deleteContentSection(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(contentSections)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(contentSections.id, id));
}

// ============ Media Files ============

export async function getAllMediaFiles(section?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (section) {
    return await db
      .select()
      .from(mediaFiles)
      .where(and(
        eq(mediaFiles.isActive, true),
        eq(mediaFiles.section, section)
      ))
      .orderBy(mediaFiles.displayOrder, desc(mediaFiles.createdAt));
  }
  
  return await db
    .select()
    .from(mediaFiles)
    .where(eq(mediaFiles.isActive, true))
    .orderBy(mediaFiles.displayOrder, desc(mediaFiles.createdAt));
}

export async function getMediaFileById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(mediaFiles)
    .where(eq(mediaFiles.id, id))
    .limit(1);
    
  return result[0] || null;
}

export async function createMediaFile(data: InsertMediaFile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(mediaFiles).values(data);
  return result;
}

export async function updateMediaFile(id: number, data: Partial<InsertMediaFile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(mediaFiles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(mediaFiles.id, id));
}

export async function deleteMediaFile(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(mediaFiles)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(mediaFiles.id, id));
}

// ============ Festival Stats ============

export async function getAllFestivalStats() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(festivalStats)
    .where(eq(festivalStats.isActive, true))
    .orderBy(festivalStats.displayOrder);
}

export async function createFestivalStat(data: InsertFestivalStat) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(festivalStats).values(data);
}

export async function updateFestivalStat(id: number, data: Partial<InsertFestivalStat>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(festivalStats)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(festivalStats.id, id));
}

export async function deleteFestivalStat(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(festivalStats)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(festivalStats.id, id));
}

// ============ Site Config ============

export async function getAllSiteConfig() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(siteConfig);
}

export async function getSiteConfigByKey(configKey: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(siteConfig)
    .where(eq(siteConfig.configKey, configKey))
    .limit(1);
    
  return result[0] || null;
}

export async function upsertSiteConfig(data: InsertSiteConfig) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .insert(siteConfig)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        valuePt: data.valuePt,
        valueEn: data.valueEn,
        description: data.description,
        updatedAt: new Date(),
      },
    });
}
