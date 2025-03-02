import express from "express";
import db from "../db/conn.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use an environment variable

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    let collection = await db.collection("users");
    let user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, name: user.name }, SECRET_KEY, { expiresIn: "2h" });

    res.status(200).json({ 
      message: "Login successful", 
      token,        // Return JWT token
      userId: user._id,  
      name: user.name  
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
