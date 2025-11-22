import Planet from "../models/planet.js";
import Course from "../models/course.js";

// Create Planet
export const createPlanet = async (req, res) => {
  try {
    const { name, desc, course, list_of_games } = req.body;

    const planet = await Planet.create({ name, desc, course, list_of_games });

    // Add planet to parent course
    const parentCourse = await Course.findById(course);
    if (parentCourse && !parentCourse.list_of_planets.includes(planet._id)) {
      parentCourse.list_of_planets.push(planet._id);
      await parentCourse.save();
    }

    res.status(201).json(planet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create planet", error: err.message });
  }
};

// Get all planets
export const getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.find()
      .populate("list_of_games")
      .populate("course", "title"); // populate only title of course
    res.status(200).json(planets);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to fetch planets", error: err.message });
  }
};

// Get planet by ID
export const getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id)
      .populate("list_of_games")
      .populate("course", "title");

    if (!planet) return res.status(404).json({ message: "Planet not found" });

    res.status(200).json(planet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to fetch planet", error: err.message });
  }
};

// Update planet
export const updatePlanet = async (req, res) => {
  try {
    const { name, desc, list_of_games } = req.body;

    const planet = await Planet.findByIdAndUpdate(
      req.params.id,
      { name, desc, list_of_games },
      { new: true, runValidators: true }
    );

    if (!planet) return res.status(404).json({ message: "Planet not found" });

    res.status(200).json(planet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update planet", error: err.message });
  }
};

// Delete planet
export const deletePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByIdAndDelete(req.params.id);
    if (!planet) return res.status(404).json({ message: "Planet not found" });

    // Remove planet from parent course
    const parentCourse = await Course.findById(planet.course);
    if (parentCourse) {
      parentCourse.list_of_planets = parentCourse.list_of_planets.filter(
        id => id.toString() !== planet._id.toString()
      );
      await parentCourse.save();
    }

    res.status(200).json({ message: "Planet deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to delete planet", error: err.message });
  }
};

// Add game to planet
export const addGameToPlanet = async (req, res) => {
  try {
    const { gameId } = req.body;
    const planet = await Planet.findById(req.params.id);
    if (!planet) return res.status(404).json({ message: "Planet not found" });

    if (!planet.list_of_games.includes(gameId)) {
      planet.list_of_games.push(gameId);
      await planet.save();
    }

    res.status(200).json(planet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add game to planet", error: err.message });
  }
};

// Remove game from planet
export const removeGameFromPlanet = async (req, res) => {
  try {
    const { gameId } = req.body;
    const planet = await Planet.findById(req.params.id);
    if (!planet) return res.status(404).json({ message: "Planet not found" });

    planet.list_of_games = planet.list_of_games.filter(id => id.toString() !== gameId);
    await planet.save();

    res.status(200).json(planet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to remove game from planet", error: err.message });
  }
};
