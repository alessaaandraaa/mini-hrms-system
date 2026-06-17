import { auth } from "./auth.ts";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers as Record<string, string>),
  });

  if (!session) {
    console.error("[unauthorized]");
    return res.status(401).json({
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this endpoint.",
    });
  }

  next();
};
