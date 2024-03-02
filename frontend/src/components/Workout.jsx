// Workout component
import axios from "axios";
import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import fromatDistancetoNow, {
  formatDistanceToNow,
} from "date-fns/formatDistanceToNow";

const Workout = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handelDeleteWorkout = async () => {
    console.log(workout._id); // Ensure this logs the correct ID
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/workouts/${workout._id}`,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data);
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border ml-6 mb-4 container justify-center">
      <h1 className="text-xl mb-4 font-bold text-green-500">{workout.title}</h1>
      <p className="text-gray-600 font-semibold">Reps: {workout.reps}</p>
      <p className="text-gray-600 font-semibold">Load: {workout.load}</p>
      <p className="text-gray-600">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span>
        <button
          onClick={handelDeleteWorkout}
          className=" mt-5 bg-red-500 text-white rounded-full px-2"
        >
          Delete
        </button>
      </span>
    </div>
  );
};

export default Workout;
