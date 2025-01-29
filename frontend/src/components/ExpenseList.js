import React, { useState, useEffect } from 'react';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from API
    setExpenses([
      { description: 'Lunch', amount: 10, date: '2025-01-28' },
      { description: 'Transport', amount: 20, date: '2025-01-29' },
    ]);
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - ${expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
