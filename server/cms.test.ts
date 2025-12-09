import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@canjala.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@canjala.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("CMS Content Sections", () => {
  it("allows public access to list content sections", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cms.contentSections.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("prevents non-admin users from creating content sections", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.cms.contentSections.create({
        sectionKey: "test_section",
        titlePt: "Teste",
        titleEn: "Test",
      })
    ).rejects.toThrow();
  });

  it("allows admin users to create content sections", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cms.contentSections.create({
      sectionKey: `test_section_${Date.now()}`,
      titlePt: "Teste",
      titleEn: "Test",
      contentPt: "Conteúdo de teste",
      contentEn: "Test content",
    });

    expect(result.success).toBe(true);
  });
});

describe("CMS Media Files", () => {
  it("allows public access to list media files", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cms.media.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("prevents non-admin users from uploading media", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.cms.media.upload({
        fileName: "test.jpg",
        fileType: "image",
        fileData: "base64data",
        mimeType: "image/jpeg",
      })
    ).rejects.toThrow();
  });
});

describe("CMS Festival Stats", () => {
  it("allows public access to list festival stats", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cms.festivalStats.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("prevents non-admin users from creating festival stats", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.cms.festivalStats.create({
        year: "2025",
        participants: 5000,
        titlePt: "Teste",
        titleEn: "Test",
      })
    ).rejects.toThrow();
  });
});

describe("CMS Site Config", () => {
  it("allows public access to list site config", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cms.siteConfig.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("prevents non-admin users from updating site config", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.cms.siteConfig.upsert({
        configKey: "test_key",
        valuePt: "valor",
        valueEn: "value",
      })
    ).rejects.toThrow();
  });
});
