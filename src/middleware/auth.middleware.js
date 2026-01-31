import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to protect routes ,

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user; 
    next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
}