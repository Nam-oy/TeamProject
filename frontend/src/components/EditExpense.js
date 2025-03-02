import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddExpense.css"; // Import CSS

function EditExpenses() {
  const { expenseId } = useParams(); // Get expense ID from the URL
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
    paymentMethod: "",
  });

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:3001/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch expense details
    axios
      .get(`http://localhost:3001/expenses/${expenseId}`)
      .then((response) => {
        console.log("Fetched expense:", response.data); // Debugging
        const formattedDate = response.data.date.split("T")[0]; // Extract YYYY-MM-DD
        setExpense({ ...response.data, date: formattedDate });
      })
      .catch((error) => console.error("Error fetching expense:", error));
  }, [expenseId]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure date is in "YYYY-MM-DD" format before sending
    const formattedExpense = {
      ...expense,
      date: expense.date ? new Date(expense.date).toISOString() : null, // Convert to ISO format
    };

    try {
      await axios.patch(
        `http://localhost:3001/expenses/${expenseId}`,
        formattedExpense
      );
      alert("Expense updated successfully");
      navigate("/expenses"); // Redirect after update
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="add_expense-container">
      <h2 className="add_expense-title">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
          className="add_expense-input"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="paymentMethod"
          className="add_expense-input"
          value={expense.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expense.description}
          onChange={handleChange}
          required
          className="add_expense-input"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount ($)"
          value={expense.amount}
          onChange={handleChange}
          required
          className="add_expense-input"
        />

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
          className="add_expense-input"
        />

        <button type="submit" className="add_expense-button">
          Update Expense
        </button>

        <button
          type="button"
          className="add_expense-button"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditExpenses;
