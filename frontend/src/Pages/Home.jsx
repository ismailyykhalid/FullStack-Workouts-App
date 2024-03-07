import React, { useEffect, useState } from "react";
import axios from "axios";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user?.Token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="flex justify-center ">
        <div className="container mt-8 mx-4">
          {Array.isArray(workouts) && workouts.length === 0 ? (
            <p className="text-center text-8xl">No workouts available 😕</p>
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
