import { randomUUID } from "crypto";
import { Request } from "express";
import pino from "pino";
import pinoHttp from "pino-http";

const service = process.env.SERVICE_NAME ?? "starter-mvc";
const env = process.env.NODE_ENV ?? "development";
const level = process.env.LOG_LEVEL ?? "info";
const filePath = process.env.LOG_FILE_PATH ?? "/var/log/app/app.log";

// Double sortie: stdout pour Docker, fichier pour ingestion Alloy -> Loki.
const streams: pino.StreamEntry[] = [
  { stream: process.stdout }
];

if (env !== "test") {
  try {
    const fileStream = pino.destination({
      dest: filePath,
      mkdir: true,
      sync: false
    });
    streams.push({ stream: fileStream });
  } catch (_error) {
    // Fallback silencieux: stdout reste actif même si le fichier n'est pas accessible.
  }
}

export const logger = pino(
  {
    level,
    // Métadonnées communes injectées sur chaque ligne de log.
    base: { service, env },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label })
    }
  },
  pino.multistream(streams)
);

type RequestWithId = Request & { id?: string };

export function getRequestId(req: Request): string | undefined {
  return (req as RequestWithId).id;
}

export const httpLogger = pinoHttp({
  logger,
  // Mapping simple: 5xx/error -> error, 4xx -> warn, reste -> info.
  customLogLevel: (_req, res, error) => {
    if (error || res.statusCode >= 500) {
      return "error";
    }

    if (res.statusCode >= 400) {
      return "warn";
    }

    return "info";
  },
  genReqId: (req, res) => {
    // Corrélation distribuée: on réutilise x-request-id s'il existe, sinon on le génère.
    const headerValue = req.headers["x-request-id"];
    const existingId =
      typeof headerValue === "string" ? headerValue : Array.isArray(headerValue) ? headerValue[0] : undefined;
    const requestId = existingId ?? randomUUID();
    res.setHeader("x-request-id", requestId);
    return requestId;
  },
  customProps: (req) => ({
    request_id: (req as RequestWithId).id
  })
});
