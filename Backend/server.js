const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db");
const { findData, importData, deleteData, UpdateScores } = require("./seeder");

const questionRouter = require("./routes/Questionroutes");
const userRouter = require("./routes/userRoute");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();
// deleteData();
// importData();
// findData();
// UpdateScores();
app.use(questionRouter);
app.use(userRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
