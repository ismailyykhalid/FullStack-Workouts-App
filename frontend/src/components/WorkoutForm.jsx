import React, { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // if (!title || !load || !reps) {
    //   setError("All fields are required.");
    //   return;
    // }

    const workout = { title, load, reps };
    console.log(workout);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/workouts",
        workout
      );
      console.log({ data });
      dispatch({ type: "CREATE_WORKOUT", payload: data });
      console.log("New Workout added");
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
    } catch ({ response }) {
      console.log(response.data.error);
      setError(response.data.error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-[60%] h-[50%]">
      <h1 className="text-2xl font-semibold mb-4">Add New Workout</h1>
      <form onSubmit={handleFormSubmit}>
        <label className="block text-sm font-medium text-gray-600 mb-4">
          Workout Title:
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter workout title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </label>
        <label className="block text-sm font-medium text-gray-600 mb-4">
          No of Reps:
          <input
            type="number"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter number of reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required={true}
          />
        </label>
        <label className="block text-sm font-medium text-gray-600 mb-4">
          Load in (Kg):
          <input
            type="number"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter load in Kg"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            required={true}
          />
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Workout
        </button>
        {error && (
          <div className="text-red-500 border border-red-500 p-2 bg-red-100 mt-3 rounded-xl">
            {error.includes("Load") && <p>Load is required.</p>}
            {error.includes("Title") && <p>Title is required.</p>}
            {error.includes("Reps") && <p>Reps is required.</p>}
          </div>
        )}
      </form>
    </div>
  );
};

export default WorkoutForm;
