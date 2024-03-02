import React, { useEffect, useState } from "react";
import axios from "axios";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/workouts")
      .then((res) => res.data)
      .then((data) => {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      });
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="container mt-8 mx-4">
          {workouts?.length === 0 ? (
            <p>No workouts available</p>
          ) : (
            workouts?.map((workout) => (
              <Workout key={workout._id} workout={workout} />
            ))
          )}
        </div>
        <WorkoutForm />
      </div>
    </>
  );
};

export default Home;
