const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const Score = require("../contestantModel");
// const  = require("../models");

const increaseScore = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    // Score.findOne({ id: id }, (err, question) => {
    // });
    const s = await Score.findOne({ id: id });
    s.score = s.score + 5;
    s.save();
    res.json(s);
    console.log(s);
  } catch (error) {
    console.log(error.message);
  }
});
const reduceScore = asyncHandler(async (req, res) => {
  // res.json("sent" + req.params.id);
  const id = req.params.id;
  try {
    // Score.findOne({ id: id }, (err, question) => {
    // });
    const s = await Score.findOne({ id: id });
    s.score = s.score - 2;
    s.save();
    res.json(s);
    console.log(s);
  } catch (err) {
    console.log(err.message);
  }
});
const bonusScore = asyncHandler(async (req, res) => {
  // res.json("sent" + req.params.id);
  const id = req.params.id;
  try {
    // Score.findOne({ id: id }, (err, question) => {
    // });
    const s = await Score.findOne({ id: id });
    s.score = s.score + 2;
    s.save();
    res.json(s);
    console.log(s);
  } catch (err) {
    console.log(err.message);
  }
});
const deleteAllScore = asyncHandler(async (req, res) => {
  try {
    Score.find({}, (err, scores) => {
      scores.map(async (score) => {
        const s = await Score.findOne({ id: score.id });
        s.score = 0;
        s.save();
      });
      res.json(scores);
    });
  } catch (err) {
    console.log(err.message);
  }
});
const getAllData = asyncHandler(async (req, res) => {
  // res.json("sent" + req.params.id);
  try {
    Score.find({}, (err, question) => {
      res.json(question);
    });
  } catch (err) {
    console.log(err.message);
  }
});
const score_Zero = asyncHandler(async () => {
  try {
    Score.find({}, (err, scores) => {
      scores.map(async (score) => {
        const s = await Score.findById(score._id);
        s.score = 0;
        console.log(score._id, "Updated to 0 ...");
        s.save();
      });
    });
  } catch (err) {
    console.log(err.message);
    // process.exit(1);
  }
});

module.exports = {
  increaseScore,
  reduceScore,
  getAllData,
  deleteAllScore,
  bonusScore,
  score_Zero,
};
