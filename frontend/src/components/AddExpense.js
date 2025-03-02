import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddExpense.css"; // Import CSS

function AddExpense() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    if (!description || !category || !amount || !date || !paymentMethod) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/expenses", {
        userId: userId, // Ensure backend converts it to ObjectId
        description,
        category,
        amount: parseFloat(amount),
        date,
        paymentMethod, // Include paymentMethod in request
      });

      alert("Expense added successfully");
      navigate("/expenses");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="add_expense-container">
      <h2 className="add_expense-title">Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          className="add_expense-input"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
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
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="add_expense-input"
        />

        <input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="add_expense-input"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="add_expense-input"
        />

        <button type="submit" className="add_expense-button">
          Add Expense
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

export default AddExpense;
