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
  const q = req.body.questions;
  try {
    if (q) {
      // res.json(q);
      // console.log(q);
      const questions = mutateArr(q);
      console.log(questions);
      // let s = await Question.insertMany(questions);
      // s.save();
      res.json("Question Sent to the database...");
    } else res.json("Server Error");
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = { postQuestions, getQuestions };
