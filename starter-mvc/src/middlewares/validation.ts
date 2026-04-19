import { NextFunction, Request, Response } from "express";
import { z } from "zod";

type ValidatedSource = "params" | "body";

// Fabrique de middleware de validation pour éviter de dupliquer safeParse dans chaque controller.
function createValidator(
  source: ValidatedSource,
  schema: z.ZodType,
  errorCode: string
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      res.status(400).json({
        error: errorCode,
        details: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message
        }))
      });
      return;
    }

    // On remplace la donnée brute par la donnée validée/normalisée par Zod.
    (req as unknown as Record<ValidatedSource, unknown>)[source] = result.data;
    next();
  };
}

export function validateParams(schema: z.ZodType, errorCode: string) {
  return createValidator("params", schema, errorCode);
}

export function validateBody(schema: z.ZodType, errorCode: string) {
  return createValidator("body", schema, errorCode);
}
