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
  "/",
  authMiddleware,
  attendanceController.addAttendance.bind(attendanceController),
);
router.put(
  "/:id",
  authMiddleware,
  attendanceController.timeOutAttendance.bind(attendanceController),
);

export default router;
