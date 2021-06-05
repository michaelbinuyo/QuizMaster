const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db");
const { findData, importData, deleteData, UpdateScores } = require("./seeder");
const Question = require("./models");

const Score = require("./contestantModel");
const q = require("../src/Quiz.json");
const questionRouter = require("./routes/Questionroutes");
const userRouter = require("./routes/userRoute");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.MONGO_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });
connectDB();
// deleteData();
// importData();
// findData();
// UpdateScores();
//api res.json
app.use(questionRouter);
app.use(userRouter);
// app.post("/user/:id", async (req, res) => {
//   // res.json("sent" + req.params.id);
//   const id = req.params.id;
//   try {
//     // Score.findOne({ id: id }, (err, question) => {
//     // });
//     const s = await Score.findOne({ id: id });
//     s.score = s.score + 5;
//     s.save();
//     res.json(s);
//     console.log(s);
//   } catch (error) {
//     console.log(err.message);
//   }
// });
// //Bonus Answer
// app.post("/bonus/:id", async (req, res) => {
//   // res.json("sent" + req.params.id);
//   const id = req.params.id;
//   try {
//     // Score.findOne({ id: id }, (err, question) => {
//     // });
//     const s = await Score.findOne({ id: id });
//     s.score = s.score + 2;
//     s.save();
//     res.json(s);
//     console.log(s);
//   } catch (error) {
//     console.log(err.message);
//   }
// });
// //Wrong answer
// app.post("/wrong/:id", async (req, res) => {
//   // res.json("sent" + req.params.id);
//   const id = req.params.id;
//   try {
//     // Score.findOne({ id: id }, (err, question) => {
//     // });
//     const s = await Score.findOne({ id: id });
//     s.score = s.score - 2;
//     s.save();
//     res.json(s);
//     console.log(s);
//   } catch (error) {
//     console.log(err.message);
//   }
// });
// //update all the scores to zero
// app.get("/delete_scores", async (req, res) => {
//   try {
//     Score.find({}, (err, scores) => {
//       scores.map(async (score) => {
//         const s = await Score.findOne({ id: score.id });
//         s.score = 0;
//         s.save();
//       });
//       res.json(scores);
//     });
//   } catch (error) {
//     console.log(err.message);
//   }
// });
// //get all the contestant
// app.get("/user", async (req, res) => {
//   // res.json("sent" + req.params.id);
//   try {
//     Score.find({}, (err, question) => {
//       res.json(question);
//     });
//   } catch (error) {
//     console.log(err.message);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
