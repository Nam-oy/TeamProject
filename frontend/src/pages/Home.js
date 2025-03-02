import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home-container">
            <header>
                <h1>📊 Personal Expense Tracker</h1>
            </header>

            <section className="cta">
                <Link to="/dashboard">
                    <button>🚀 Get Started</button>
                </Link>
                <p>Manage your expenses easily and efficiently!</p>
            </section>
        </div>
    );
};

export default HomePage;
