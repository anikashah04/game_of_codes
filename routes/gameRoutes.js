import express from "express";
import { createGame, getAllGames, getGame, updateGame, deleteGame ,addLevel,updateLevel,getLevel,deleteLevel} from "../controllers/gameController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("Admin"), createGame);
router.get("/", authMiddleware, getAllGames);
router.get("/:id", authMiddleware, getGame);
router.put("/:id", authMiddleware, authorizeRoles("Admin"), updateGame);
router.delete("/:id", authMiddleware, authorizeRoles("Admin"), deleteGame);

router.post("/:gameId/levels", authMiddleware,authorizeRoles("Admin"),  addLevel);                     
router.get("/:gameId/levels/:levelNumber",authMiddleware, getLevel);                        
router.patch("/:gameId/levels/:levelNumber", authMiddleware, authorizeRoles("Admin"), updateLevel);    
router.delete("/:gameId/levels/:levelNumber", authMiddleware, authorizeRoles("Admin"), deleteLevel);

export default router;
