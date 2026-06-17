import express from "express";
import { AttendanceController } from "../controllers/attendance.controller.ts";
import { authMiddleware } from "../lib/middleware.ts";
const router = express.Router();
const attendanceController = new AttendanceController();

router.get(
  "/",
  authMiddleware,
  attendanceController.getAttendance.bind(attendanceController),
);
router.post(
  "/:id",
  authMiddleware,
  attendanceController.addAttendance.bind(attendanceController),
);

export default router;
