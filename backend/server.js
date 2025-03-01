import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import record_expenses from "./routes/record_expenses.js";
import api_login from "./routes/api_login.js";
import api_register from "./routes/api_register.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", record_expenses);
app.use('/login', api_login);
app.use("/register", api_register); 

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});