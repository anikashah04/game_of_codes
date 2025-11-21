import express from "express";
import { playGame, getUserProgress, getGameProgress,deleteProgress,addBadgeToProgress } from "../controllers/progressController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/play", authMiddleware, playGame);
router.get("/user/:userId", authMiddleware, getUserProgress);
router.get("/user/:userId/game/:gameId", authMiddleware, getGameProgress);
router.post("/add-badge", authMiddleware, authorizeRoles("Admin"), addBadgeToProgress);
router.delete("/:id", authMiddleware, authorizeRoles("Admin"), deleteProgress);

export default router;
