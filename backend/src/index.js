import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./db/connection.js";
import { workoutRoutes } from "./routes/workouts.js";

import cors from "cors";

// Creating APP
const app = express();
//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Home" });
});

app.use("/api/workouts", workoutRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.clear();
  console.log("✅Server is running on port:", process.env.PORT);
});
