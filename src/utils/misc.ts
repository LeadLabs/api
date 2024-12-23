import type { Response } from "express";

// Parser
export async function parseJSONResponse(
  res: Response,
  data: any,
  status: number = 200,
) {
  return res.status(status).json(data);
}
