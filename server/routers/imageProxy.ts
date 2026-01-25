import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

export const imageProxyRouter = router({
    fetch: publicProcedure
        .input(z.object({ url: z.string().url() }))
        .query(async ({ input, ctx }) => {
            try {
                const response = await fetch(input.url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                }

                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const contentType = response.headers.get('content-type') || 'image/jpeg';

                // Set appropriate headers
                ctx.res.setHeader('Content-Type', contentType);
                ctx.res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
                ctx.res.send(buffer);

                return { success: true };
            } catch (error) {
                console.error('Image proxy error:', error);
                throw new Error('Failed to fetch image');
            }
        }),
});
