import React, { useEffect, useState } from "react";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader.jsx";

const Home = () => {
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkoutsContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user?.Token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });

          setLoading(true);
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="flex justify-center  mt-24">
        <div className="container mt-8 mx-4">
          {workouts && workouts.length === 0 ? (
            <p className="text-center text-8xl">Create a workout </p>
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
