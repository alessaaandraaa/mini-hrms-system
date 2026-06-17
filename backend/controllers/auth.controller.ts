import { isAPIError } from "better-auth/api";
import { auth } from "../lib/auth.ts";
import type { Request, Response } from "express";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const data = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });

      return res.json({ success: true, session: { token: data.token } });
    } catch (error) {
      console.error("[auth]: ", error);
      if (isAPIError(error)) {
        if (error.statusCode === 401) {
          return res.status(401).json({
            success: false,
            error: {
              code: "INVALID_CREDENTIALS",
              message: "Invalid email or password.",
            },
          });
        }

        if (error.statusCode === 429) {
          return res.status(429).json({
            success: false,
            error: {
              code: "TOO_MANY_REQUESTS",
              message: "Too many login attempts.",
            },
          });
        }
      }

      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while logging in.",
        },
      });
    }
  }
}
