import { Workout } from "../models/workoutModel.js";
import mongoose from "mongoose";

//Get all Workouts
const getAllWorkouts = async (req, res) => {
  const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(allWorkouts);
};

//Get a single Workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a Valid ID" });
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

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a single workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params.id;
  try {
    const deletedWorkout = await Workout.findOneAndDelete({ _id: id });
    if (!deleteWorkout) {
      return res.status(404).json({ error: "No Such Workout" });
    }
    res.status(200).json(deletedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update a single workout
const updateWorkout = async (req, res) => {
  const { id, title, reps, load } = req.body;

  try {
    const updatedWorkout = await Workout.updateOne(
      { id },
      { title, reps, load }
    );
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
