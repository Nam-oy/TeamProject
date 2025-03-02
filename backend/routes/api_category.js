import express from "express";
import db from "../db/conn.js";

const router = express.Router();

// Fetch all categories
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("categories");
    const results = await collection.find({}, { projection: { name: 1 } }).toArray(); // Fetch only 'name'
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
