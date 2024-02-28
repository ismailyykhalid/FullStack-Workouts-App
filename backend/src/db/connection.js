import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    .then(() => {
      console.log(`🟢MongoDB Connected !!! `);
    })
    .catch((err) => {
      console.log("Error Connecting DB Failed >> ", err);
      process.exit(1);
    });
};
