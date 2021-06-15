const mongo = require("mongoose");
const db = require("./db");
const Question = require("./models");
const q = require("../src/Quiz.json");
let s = require("../src/contestant.json");
const Score = require("./contestantModel");
const importData = async (arr) => {
  try {
    // await Question
    // const createQuestion = await Question.insertMany(q);
    // s = s.map((e, i) => (e.id = i));
    const createScore = await Score.insertMany(s);

    console.log("Data Added!");
    // process.exit();
  } catch (err) {
    console.log(err.message);
    // process.exit(1);
  }
};

const deleteData = async () => {
  try {
    // await Question

    const createQuestion = await Score.deleteMany({}, (err, question) => {
      console.log(question);
    });
    // console.log();
    // process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
const findData = async (arr) => {
  try {
    // await Question
    const createQuestion = await Question.find({}, (err, question) => {
      return question;
    });
    // process.exit();
  } catch (err) {
    console.log(err.message);
    // process.exit(1);
  }
};
const UpdateScores = async () => {
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
};
module.exports = { deleteData, importData, findData, UpdateScores };
