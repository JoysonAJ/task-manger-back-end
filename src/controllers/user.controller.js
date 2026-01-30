import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const generateToken = (res, userId) => {
    const token = jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn:  process.env.ACCESS_TOKEN_EXPIRY }
    );
  
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
  
    return token;
  };
  

/**
 * Registers a new user and logs them in immediately
 * @route POST /api/users/register
 */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  generateToken(res, user._id);

  res.status(201).json({
    message: "User registered and logged in successfully",
  });

};

/**
 * Logs in an existing user
 * @route POST /api/users/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  generateToken(res, user._id);

  res.status(200).json({
    message: "Login successful",
  });
};


/**
 * Logs out the current user
 * @route POST /api/users/logout
 */
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

/**
 * Get current logged-in user
 * @route GET /api/users/me
 * @access Private
 */
export const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

