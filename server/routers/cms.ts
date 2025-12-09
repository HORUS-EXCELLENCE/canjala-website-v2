import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAllContentSections,
  getContentSectionByKey,
  createContentSection,
  updateContentSection,
  deleteContentSection,
  getAllMediaFiles,
  getMediaFileById,
  createMediaFile,
  updateMediaFile,
  deleteMediaFile,
  getAllFestivalStats,
  createFestivalStat,
  updateFestivalStat,
  deleteFestivalStat,
  getAllSiteConfig,
  getSiteConfigByKey,
  upsertSiteConfig,
} from "../cms";
import { storagePut } from "../storage";
import { nanoid } from "nanoid";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const cmsRouter = router({
  // ============ Content Sections ============
  
  contentSections: router({
    list: publicProcedure.query(async () => {
      return await getAllContentSections();
    }),
    
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await getContentSectionByKey(input.key);
      }),
    
    create: adminProcedure
      .input(z.object({
        sectionKey: z.string(),
        titlePt: z.string().optional(),
        titleEn: z.string().optional(),
        contentPt: z.string().optional(),
        contentEn: z.string().optional(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await createContentSection(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        titlePt: z.string().optional(),
        titleEn: z.string().optional(),
        contentPt: z.string().optional(),
        contentEn: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateContentSection(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteContentSection(input.id);
        return { success: true };
      }),
  }),

  // ============ Media Files ============
  
  media: router({
    list: publicProcedure
      .input(z.object({ section: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getAllMediaFiles(input?.section);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getMediaFileById(input.id);
      }),
    
    upload: adminProcedure
      .input(z.object({
        fileName: z.string(),
        fileType: z.enum(["image", "video"]),
        fileData: z.string(), // base64 encoded
        mimeType: z.string(),
        section: z.string().optional(),
        captionPt: z.string().optional(),
        captionEn: z.string().optional(),
        altTextPt: z.string().optional(),
        altTextEn: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Decode base64 file data
        const buffer = Buffer.from(input.fileData, "base64");
        const fileSize = buffer.length;
        
        // Generate unique file key
        const fileExtension = input.fileName.split(".").pop();
        const fileKey = `media/${input.fileType}s/${nanoid()}.${fileExtension}`;
        
        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        
        // Save to database
        await createMediaFile({
          fileKey,
          url,
          fileName: input.fileName,
          fileType: input.fileType,
          mimeType: input.mimeType,
          fileSize,
          section: input.section,
          captionPt: input.captionPt,
          captionEn: input.captionEn,
          altTextPt: input.altTextPt,
          altTextEn: input.altTextEn,
          uploadedBy: ctx.user.id,
        });
        
        return { success: true, url };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        section: z.string().optional(),
        captionPt: z.string().optional(),
        captionEn: z.string().optional(),
        altTextPt: z.string().optional(),
        altTextEn: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateMediaFile(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteMediaFile(input.id);
        return { success: true };
      }),
  }),

  // ============ Festival Stats ============
  
  festivalStats: router({
    list: publicProcedure.query(async () => {
      return await getAllFestivalStats();
    }),
    
    create: adminProcedure
      .input(z.object({
        year: z.string(),
        participants: z.number().optional(),
        titlePt: z.string().optional(),
        titleEn: z.string().optional(),
        descriptionPt: z.string().optional(),
        descriptionEn: z.string().optional(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await createFestivalStat(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        year: z.string().optional(),
        participants: z.number().optional(),
        titlePt: z.string().optional(),
        titleEn: z.string().optional(),
        descriptionPt: z.string().optional(),
        descriptionEn: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateFestivalStat(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteFestivalStat(input.id);
        return { success: true };
      }),
  }),

  // ============ Site Config ============
  
  siteConfig: router({
    list: publicProcedure.query(async () => {
      return await getAllSiteConfig();
    }),
    
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await getSiteConfigByKey(input.key);
      }),
    
    upsert: adminProcedure
      .input(z.object({
        configKey: z.string(),
        valuePt: z.string().optional(),
        valueEn: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertSiteConfig(input);
        return { success: true };
      }),
  }),
});
