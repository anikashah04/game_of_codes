import express from "express";
import {
  createPlanet,
  getAllPlanets,
  getPlanetById,
  updatePlanet,
  deletePlanet,
  addGameToPlanet,
  removeGameFromPlanet,
} from "../controllers/planetController.js";

import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

// Create a new planet (Admin only)
router.post("/", authMiddleware, authorizeRoles("Admin"), createPlanet);

// Get all planets
router.get("/", getAllPlanets);

// Get a planet by ID
router.get("/:id", getPlanetById);

// Update a planet (Admin only)
router.put("/:id", authMiddleware, authorizeRoles("Admin"), updatePlanet);

// Delete a planet (Admin only)
router.delete("/:id", authMiddleware, authorizeRoles("Admin"), deletePlanet);

// Add a game to a planet (Admin only)
router.post("/:id/add-game", authMiddleware, authorizeRoles("Admin"), addGameToPlanet);

// Remove a game from a planet (Admin only)
router.post("/:id/remove-game", authMiddleware, authorizeRoles("Admin"), removeGameFromPlanet);

export default router;
