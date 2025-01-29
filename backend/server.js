require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Middleware
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



