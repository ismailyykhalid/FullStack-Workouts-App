import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Get All users TEMP
export const allUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};
// Login Controller
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //Creating and Asigning Token
    const Token = createToken(user._id);

    res.status(200).json({ email, Token });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

// Signup Controller
export const userSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //Creating and Asigning Token
    const Token = createToken(user._id);

    res.status(200).json({ email, Token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
