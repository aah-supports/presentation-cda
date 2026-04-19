import { z } from "zod";

export const productIdParamsSchema = z.object({
  id: z.uuid()
});

export const stockProjectionBodySchema = z
  .object({
    incoming: z.number().int().nonnegative().optional(),
    outgoing: z.number().int().nonnegative().optional(),
    reserve: z.number().int().nonnegative().optional(),
    release: z.number().int().nonnegative().optional(),
    adjust: z.number().int().optional()
  })
  .strict();

export type ProductIdParamsDto = z.infer<typeof productIdParamsSchema>;
export type StockProjectionBodyDto = z.infer<typeof stockProjectionBodySchema>;
