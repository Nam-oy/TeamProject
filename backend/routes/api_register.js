import express from "express";
import db from "../db/conn.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

router.post("/", async (req, res) => {  
  const { name, email, password } = req.body;

  try {
    let collection = db.collection("users");

    // Check if email already exists
    let existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Insert into DB
    await collection.insertOne(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
