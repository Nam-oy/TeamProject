import React, { useState } from 'react';

function AddExpenseForm() {
  const [expense, setExpense] = useState({ description: '', amount: '', date: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to save expense
    console.log('Expense added:', expense);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="description" 
        value={expense.description} 
        onChange={handleInputChange} 
        placeholder="Expense description" 
      />
      <input 
        type="number" 
        name="amount" 
        value={expense.amount} 
        onChange={handleInputChange} 
        placeholder="Amount" 
      />
      <input 
        type="date" 
        name="date" 
        value={expense.date} 
        onChange={handleInputChange} 
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
