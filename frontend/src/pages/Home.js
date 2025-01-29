import React from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';

function Home() {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <AddExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default Home;
