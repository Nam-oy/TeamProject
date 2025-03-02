
import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId; // Get userId from query params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const collection = db.collection("expenses"); // No need for await here
    const results = await collection.find({ userId: new ObjectId(userId) }).toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Add a new expense
router.post("/", async (req, res) => {
  try {
    const { userId, description, category, amount, date, paymentMethod } = req.body;

    // Validate request body
    if (!userId || !description || !category || !amount || !date || !paymentMethod) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newExpense = {
      userId: new ObjectId(userId), // Convert userId to ObjectId
      description,
      category, // Keep category as a string
      amount: parseFloat(amount),
      date: new Date(date),
      paymentMethod,
      createdAt: new Date(), // Add a createdAt timestamp
    };

    let collection = await db.collection("expenses");
    let result = await collection.insertOne(newExpense);

    res.status(201).json({ message: "Expense added successfully", result });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Failed to add expense" });
  }
});


// Update an expense by ID
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    // Convert date string to Date object
    const dateObject = req.body.date ? new Date(req.body.date) : null;

    const updates = {
      $set: {
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
        paymentMethod: req.body.paymentMethod,
        date: dateObject, // Store as a Date type
      },
    };

    const result = await db.collection("expenses").updateOne(query, updates);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("expenses");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("expenses");

    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;