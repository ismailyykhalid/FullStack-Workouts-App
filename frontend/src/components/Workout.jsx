// Workout component
import axios from "axios";
import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const Workout = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const handelDeleteWorkout = async () => {
    if (!user) {
      return;
    }
    console.log(workout._id); // Ensure this logs the correct ID
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/workouts/${workout._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.Token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="bg-white w-48 h-64 rounded-lg shadow-md border ml-6 mb-4 container justify-center">
        <div className="flex p-2 gap-1">
          <div className="">
            <span
              onClick={handelDeleteWorkout}
              className="bg-red-500 center w-3 h-3 rounded-full hover:bg-red-300 hover:cursor-pointer hover:w-4 hover:h-4 flex items-center justify-center mt-[6px] "
            >
              <p className=" text-[10px] hover:text-[14px] font-bold text-black ">
                x
              </p>
            </span>
          </div>
          <div className="circle">
            <span className="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <div className=" ml-3 mt-5">
          <h1 className="text-xl mb-4 font-bold text-red-400">
            Title :{" "}
            <span className="text-lg text-black font-semibold">
              {workout.title}{" "}
            </span>
          </h1>
          <p className="text-gray-600 font-semibold">Reps: {workout.reps} 🔁</p>
          <p className="text-gray-600 font-semibold">Load: {workout.load} 💪</p>
          <p className="text-gray-600 mt-16">
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default Workout;
