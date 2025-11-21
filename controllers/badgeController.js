import Badge from "../models/badge.js";
import UserProgress from "../models/user_progress.js";

// Create badge
export const createBadge = async (req, res) => {
  try {
    const badge = await Badge.create(req.body);
    res.status(201).json(badge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get badges for a user
export const getUserBadges = async (req, res) => {
  const badges = await Badge.find({ user: req.params.userId });
  res.json(badges);
};

// Assign badge based on progress
export const assignBadge = async (userId, criteria) => {
  const progresses = await UserProgress.find({ user: userId });
  for (const p of progresses) {
    if (p.score >= criteria) {
      const badgeExists = await Badge.findOne({ user: userId, name: "High Score" });
      if (!badgeExists) {
        await Badge.create({ user: userId, name: "High Score", criteria: `Score >= ${criteria}` });
      }
    }
  }
};
