import express from "express";
import { signUpUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

//public 
router.post("/signup", signUpUser);
router.post("/login", loginUser);

//protected 
router.get("/", authMiddleware, authorizeRoles("Admin"), getUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, authorizeRoles("Admin"), deleteUser);

export default router;
