import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const serverResponse = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const serverResponseJson = await serverResponse.json();

    if (serverResponse.status !== 201) {
      setError(serverResponseJson.error);
    }
    if (serverResponse.status == 201) {
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: serverResponseJson });
      console.log("new Workout added");
      setTitle("");
      setLoad("");
      setReps("");
    }
  };

  return (
    <div className="  mt-8 p-6 bg-white rounded-lg shadow-md  mr-10 w-[60%] h-[50%]">
      <h1 className="text-2xl font-semibold mb-4">Add New Workout</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Workout Title:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter workout title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            No of Reps:
          </label>
          <input
            type="number"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter number of reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Load in (Kg):
          </label>
          <input
            type="number"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter load in Kg"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Workout
        </button>
        {error && (
          <div className="text-red-500 border border-red-500 p-2 bg-red-100 mt-3 rounded-xl">
            {error.includes("load") && <p>Load is required.</p>}
            {error.includes("title") && <p>Title is required.</p>}
            {error.includes("reps") && <p>Reps is required.</p>}
          </div>
        )}
      </form>
    </div>
  );
};

export default WorkoutForm;
