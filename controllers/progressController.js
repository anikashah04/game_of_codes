import UserProgress from "../models/user_progress.js";
import Game from "../models/game.js";
import Badge from "../models/badge.js";

// Create or Update User Progress
export const playGame = async (req, res) => {
  try {
    const { user, course, game, level, score, timeSpent,badgesEarned } = req.body;

    const games = await Game.findById(game);
    console.log(games);
  
    if (!games)
      return res.status(404).json({ error: "Game not found" });

    // Check if progress already exists
    let progress = await UserProgress.findOne({ user, game, course});

    if (progress) {
      // Update existing progress
      progress.level = level;           // from request body
      progress.totalPoints = score;
      progress.timeSpent = timeSpent;
      await progress.save();
      return res.status(200).json(progress);
    }

    // Create new progress
    progress = await UserProgress.create({
      user,
      course,
      game,
      level,
      totalPoints: score,
      timeSpent
    });

    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all progress for a user
export const getUserProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({ user: req.params.userId })
      .populate("game")
      .populate("course")
      .populate("badgesEarned");
    res.status(200).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get progress for a specific game
export const getGameProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      user: req.params.userId,
      game: req.params.gameId
    })
      .populate("game")
      .populate("course")
      .populate("badgesEarned");

    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.status(200).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a badge to user progress
export const addBadgeToProgress = async (req, res) => {
  try {
    const { progressId, badgeId } = req.body;
    const progress = await UserProgress.findById(progressId);
    if (!progress) return res.status(404).json({ error: "Progress not found" });

    if (!progress.badgesEarned.includes(badgeId)) {
      progress.badgesEarned.push(badgeId);
      await progress.save();
    }

    res.status(200).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user's progress
export const deleteProgress = async (req, res) => {
  try {
    await UserProgress.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User progress deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
