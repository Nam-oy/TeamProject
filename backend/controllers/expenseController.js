
const Expense = require('../models/Expense');

// Get all expenses
const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

// Add a new expense
const addExpense = async (req, res, next) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    next(err);
  }
};

module.exports = { getExpenses, addExpense };
