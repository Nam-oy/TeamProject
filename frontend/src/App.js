import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./components/Login";
import LogoutButton from "./components/Logout";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./components/AddExpense";
import EditExpense from "./components/EditExpense";

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("username");

    if (token) {
      setIsAuthenticated(true);
      setUsername(storedName || "");
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        {/* Show only the login page if not authenticated */}
        {!isAuthenticated ? (
          <Routes>
            <Route
              path="*"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
          </Routes>
        ) : (
          <>
            <h1>Personal Expense Tracker</h1>

            {/* Navbar - Only show after login */}
            <nav className="navbar">
              <ul>
                <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
                <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink></li>
                <li><NavLink to="/expenses" className={({ isActive }) => (isActive ? "active" : "")}>Expenses</NavLink></li>
                <li><NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>Settings</NavLink></li>
              </ul>
            </nav>

            {/* Authenticated User Info */}
            <div className="auth-section">
              <span className="username">Welcome, {username}!</span>
              <LogoutButton setIsAuthenticated={setIsAuthenticated} />
            </div>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/edit-expense/:expenseId" element={<EditExpense />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
