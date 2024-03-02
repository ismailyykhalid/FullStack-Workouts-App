import { Workout } from "../models/workoutModel.js";
import mongoose from "mongoose";

//Get all Workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  if (workouts.length === 0) {
    return res
      .status(200)
      .json({ message: "Workouts Collection is empty in DB" });
  }
  res.status(200).json(workouts);
};

//Get a single Workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a workout with this ID" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  res.status(200).json(workout);
};

//Create a new Workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // Check if any of the required fields are missing
  if (!title) {
    return res.status(400).json({ error: "Title is required." });
  }
  if (!reps) {
    return res.status(400).json({ error: "Reps are required." });
  }
  if (!load) {
    return res.status(400).json({ error: "Load is required." });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a single workout

const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Not valid ID" });
    }

    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: "No Such Workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//Update a single workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a workout with this ID" });
  }
  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  res.status(200).json(workout);
};

export {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
