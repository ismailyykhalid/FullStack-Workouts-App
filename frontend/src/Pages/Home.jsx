import React, { useEffect, useState } from "react";
import axios from "axios";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [allWorkouts, setAllWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts");

        // Ensure the response data is an array before setting the state
        if (Array.isArray(response.data)) {
          setAllWorkouts(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="container mt-8 mx-4">
          {allWorkouts.length === 0 ? (
            <p>No workouts available</p>
          ) : (
            allWorkouts.map((workout) => (
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
