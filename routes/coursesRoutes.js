import express from "express";
import { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, addGameToCourse, removeGameFromCourse } from "../controllers/courseController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("Admin"), createCourse);
router.get("/", authMiddleware, getAllCourses);
router.get("/:id", authMiddleware, getCourseById);
router.put("/:id", authMiddleware, authorizeRoles("Admin"), updateCourse);
router.delete("/:id", authMiddleware, authorizeRoles("Admin"), deleteCourse);

// Add or remove games from course
router.put("/:id/add-game", authMiddleware, authorizeRoles("Admin"), addGameToCourse);
router.put("/:id/remove-game", authMiddleware,authorizeRoles("Admin"),  removeGameFromCourse);

export default router;
