import Course from "../models/course.js";
import Game from "../models/game.js";
import Badge from "../models/badge.js";

//create course
export const createCourse = async (req, res) => {
  try {
    const { title, description, ageGroup, programmingLanguage_stack, list_of_planets, //badges 
      } = req.body;

    const course = await Course.create({
      title,
      description,
      ageGroup,
      programmingLanguage_stack,
      list_of_planets,   // array of Game IDs
      //badges   // array of Badge IDs
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create course", error });
  }
};

//read all Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path:"list_of_planets",
      select:"name",
      populate: { path: "list_of_games", select: "name" }})   // populate game details
      //.populate("badges"); // populate badge details
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to fetch courses", error });
  }
};

//read course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    .populate({
      path:"list_of_planets",
    select:"name",
    populate: { path: "list_of_games", select: "name" }}) 
      //.populate("badges");

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to fetch course", error });
  }
};

//update a course
export const updateCourse = async (req, res) => {
  try {
    const { title, description, ageGroup, programmingLanguage_stack, list_of_planets, //badges 
      }
       = req.body;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, ageGroup, programmingLanguage_stack, list_of_planets, //badges 
        },
      { new: true, runValidators: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update course", error });
  }
};

//delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to delete course", error });
  }
};

// add planet to course
export const addPlanetToCourse = async (req, res) => {
  try {
    const { planetId } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.list_of_planets.includes(planetId)) {
      course.list_of_planets.push(planetId);
      await course.save();
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to add planet to course", error });
  }
};

// remove planet from course
export const removePlanetFromCourse = async (req, res) => {
  try {
    const { planetId } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.list_of_planets = course.list_of_planets.filter(id => id.toString() !== planetId);
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to remove planet from course", error });
  }
};
