// src/server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { workoutRoutes } from "./routes/workouts.js";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

// Creating APP
const app = express();
//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Home" });
});

app.use("/api/workouts", workoutRoutes);

export const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    .then(() => {
      console.log(`MongoDB Connected !!! `);
      app.listen(process.env.PORT, () => {
        console.log("App is listening on port:", process.env.PORT);
      });
    })
    .catch((err) => {
      console.log("Error Connecting DB Failed >> ", err);
      process.exit(1);
    });
};

connectDB();
