// src/server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { workoutRoutes } from "./routes/workouts.js";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import fs from "fs";
import cors from "cors";

// Creating APP
const app = express();
//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Home" });
});

app.use((req, res, next) => {
  const formattedDate = new Date().toLocaleDateString("en-GB");

  fs.appendFile(
    "reqDetails.txt",
    `\n Date : ${formattedDate}, Request Method : ${req.method}`,
    (err) => {
      if (err) {
        console.error("Error appending to file:", err);
      }
      next();
    }
  );
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
