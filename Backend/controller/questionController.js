const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const shuffle = require("../../temp");
const mutateArr = require("../../test");
const Question = require("../models");
const getQuestions = asyncHandler(async (req, res) => {
  try {
    Question.find({}, (err, questionBank) => {
      let questions = shuffle(questionBank).filter((e, i) => i < 10);

      res.json(questions);
    });
  } catch (error) {
    console.log(error.message);
  }
});
const postQuestions = asyncHandler(async (req, res) => {
  const q = req.body;
  console.log(q, "from server");
  try {
    if (q) {
      res.json(q);
      // console.log(q);
      // const questions = mutateArr(q);
      // await Question.insertMany(q);

      res.json("Question Sent to the database...");
    } else res.json("Server Error");
  } catch (error) {
    console.log(error.message);
  }
});
const deleteQuestion = asyncHandler(async (req, res) => {
  try {
    // await Question

    await Question.deleteMany({}, () => {});
    console.log("Question Deleted!!");
    // console.log();
    // process.exit();
    res.json("Question Deleted");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
});
module.exports = { postQuestions, getQuestions, deleteQuestion };
