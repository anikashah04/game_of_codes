import express from "express";
import { createBadge, getUserBadges } from "../controllers/badgeController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("Admin"), createBadge);
router.get("/:userId", authMiddleware, getUserBadges);

export default router;
