import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "./ExpenseList.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Use userId instead of username

    if (!userId) return; // Prevent request if no user is logged in

    axios
      .get(`http://localhost:3001/expenses?userId=${userId}`) // Send userId
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const categories = [...new Set(expenses.map((expense) => expense.category))];

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "" || expense.category === category) &&
      (!start || expenseDate >= start) &&
      (!end || expenseDate <= end)
    );
  });

   // Navigate to Edit Page
   const handleEdit = (expenseId) => {
    navigate(`/edit-expense/${expenseId}`);
  };

  
  const handleDelete = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      axios
        .delete(`http://localhost:3001/expenses/${expenseId}`)
        .then(() => {
          setExpenses(expenses.filter((expense) => expense._id !== expenseId)); // Remove from UI
        })
        .catch((error) => console.error("Error deleting expense:", error));
    }
  };
  

  return (
    <div className="expense-container">
      <h2>Expense List</h2>
      <div >
        <Link to="/add-expense">
          <button className="expense-button">Add Expense</button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Expense Table */}
      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount ($)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>${expense.amount}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>
                    <button className="edit_expense-button" onClick={() => handleEdit(expense._id)}>
                      Edit
                    </button>

                    <button className="del_expense-button" onClick={() => handleDelete(expense._id)}>
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;
