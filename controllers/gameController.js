import Game from "../models/game.js";

// Create a game
export const createGame = async (req, res) => {
  try {
    const { name, category, levels, questionText, rewardPoints, starterCode, testCases } = req.body;

    if (!name || !category || !levels) {
      return res.status(400).json({ error: "Name, category, and level are required." });
    }

    const game = await Game.create({
      name,
      category,
      levels,
      questionText,
      rewardPoints,
      starterCode,
      testCases
    });

    res.status(201).json({ message: "Game created successfully", game });
  } catch (err) {
    console.error("Error creating game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all games
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ levels: 1, name: 1 }); // sorted by level then name
    res.status(200).json({ count: games.length, games });
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get one game
export const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: "Game not found" });

    res.status(200).json({ game });
  } catch (err) {
    console.error("Error fetching game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update game
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!game) return res.status(404).json({ error: "Game not found" });

    res.status(200).json({ message: "Game updated successfully", game });
  } catch (err) {
    console.error("Error updating game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete game
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) 
      return res.status(404).json({ error: "Game not found" });

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (err) {
    console.error("Error deleting game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//levels in the game
// Add a new level to a game
export const addLevel = async (req, res) => {
  try {
    const { gameId } = req.params;
    const levelData = req.body;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });

    // Check if levelNumber already exists
    if (game.levels.some(l => l.levelNumber === Number(levelData.levelNumber))) {
      return res.status(400).json({ error: "Level number already exists" });
    }

    game.levels.push(levelData);
    await game.save();

    res.status(201).json({ message: "Level added", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a specific level
export const updateLevel = async (req, res) => {
  try {
    const { gameId, levelNumber } = req.params;
    const levelData = req.body;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });

    const level = game.levels.find(l => l.levelNumber == levelNumber);
    if (!level) return res.status(404).json({ error: "Level not found" });

    Object.assign(level, levelData);
    await game.save();

    res.status(200).json({ message: "Level updated", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a specific level
export const deleteLevel = async (req, res) => {
  try {
    const { gameId, levelNumber } = req.params;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });

    game.levels = game.levels.filter(l => l.levelNumber != levelNumber);
    await game.save();

    res.status(200).json({ message: "Level deleted", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific level
export const getLevel = async (req, res) => {
  try {
    const { gameId, levelNumber } = req.params;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });

    const level = game.levels.find(l => l.levelNumber == levelNumber);
    if (!level) return res.status(404).json({ error: "Level not found" });

    res.status(200).json({ level });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

