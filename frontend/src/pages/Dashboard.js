import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001/api/expenses")
            .then(response => {
                setExpenses(response.data);
                setTotal(response.data.reduce((sum, exp) => sum + exp.amount, 0));
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Total Expenses: ${total}</h3>
            
            <canvas id="expenseChart"></canvas>

            <Link to="/add-expense">
                <button>Add Expense</button>
            </Link>

            <ul>
                {expenses.map(exp => (
                    <li key={exp._id}>
                        {exp.title} - ${exp.amount} ({exp.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
