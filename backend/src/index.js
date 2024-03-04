import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./db/connection.js";
import { workoutRoutes } from "./routes/workouts.js";

import cors from "cors";
import { userRoutes } from "./routes/user.js";

// Creating APP
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "Home" });
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.clear();
  console.log("✅Server is running on port:", process.env.PORT);
});
