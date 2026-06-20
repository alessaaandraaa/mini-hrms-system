import express from "express";
import { DashboardController } from "../controllers/dashboard.controller.ts";
import { authMiddleware } from "../lib/middleware.ts";
const router = express.Router();
const dashboardController = new DashboardController();

router.get(
  "/",
  authMiddleware,
  dashboardController.getDashboardStats.bind(dashboardController),
);

export default router;
