import express from "express";
import { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, addPlanetToCourse,removePlanetFromCourse } from "../controllers/courseController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("Admin"), createCourse);
router.get("/", authMiddleware, getAllCourses);
router.get("/:id", authMiddleware, getCourseById);
router.put("/:id", authMiddleware, authorizeRoles("Admin"), updateCourse);
router.delete("/:id", authMiddleware, authorizeRoles("Admin"), deleteCourse);

// Add or remove planets from course
router.put("/:id/add-planets", authMiddleware, authorizeRoles("Admin"), addPlanetToCourse);
router.put("/:id/remove-planets", authMiddleware,authorizeRoles("Admin"), removePlanetFromCourse);

export default router;
