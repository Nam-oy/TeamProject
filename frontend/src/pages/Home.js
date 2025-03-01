// import React from 'react';
// import AddExpenseForm from '../components/AddExpenseForm';
// import ExpenseList from '../components/ExpenseList';

// function Home() {
//   return (
//     <div>
//       <h3>Welcome to Expense Tracker</h3>
//       <AddExpenseForm />
//       <ExpenseList />
//     </div>
//   );
// }

// export default Home;

import "./home.css";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home-container">
            {/* ส่วน Header */}
            <header>
                <h1>📊 Personal Expense Tracker</h1>
                <p>Manage your expenses easily and efficiently!</p>
            </header>

            {/* แสดง Key Features */}
            <section className="features">
                <h2>Why Use This App?</h2>
                <ul>
                    <li>✅ Track your daily expenses</li>
                    <li>📊 Get insights with spending analytics</li>
                    <li>🔔 Set budgets and alerts</li>
                    <li>📝 Easy-to-use interface</li>
                </ul>
            </section>

            {/* ภาพประกอบหรือ Preview Dashboard */}
            <section className="preview">
                <img src="dashboard-preview.png" alt="Dashboard Preview" />
            </section>

            {/* ปุ่ม Get Started */}
            <section className="cta">
                <Link to="/dashboard">
                    <button>🚀 Get Started</button>
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
