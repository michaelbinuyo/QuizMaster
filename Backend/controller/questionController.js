const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const Question = require("../models");
const getQuestions = asyncHandler(async (req, res) => {
  try {
    Question.find({}, (err, user) => {
      res.json(user);
    });
  } catch (error) {
    console.log(error.message);
  }
});
const postQuestions = asyncHandler(async (req, res) => {
  // q = req.body.question;
  try {
    if (q) {
      // res.json(q);
      await Question.insertMany(q);
      res.json("Question Sent to the database...");
    } else res.json("Server Error");
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = { postQuestions, getQuestions };
