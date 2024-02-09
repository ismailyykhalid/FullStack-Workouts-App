// Workout component
import React from "react";

const Workout = ({ workout }) => {
  return (
    <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border  ml-6 mb-4 container justify-center">
      <h1 className="text-xl mb-4 font-bold text-green-500">{workout.title}</h1>
      <p className="text-gray-600 font-semibold">Reps: {workout.reps}</p>
      <p className="text-gray-600 font-semibold">Load: {workout.load}</p>
      <p className="text-gray-600">{workout.createdAt}</p>
    </div>
  );
};

export default Workout;
