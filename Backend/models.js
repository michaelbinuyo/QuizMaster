const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchama = new Schema(
  {
    _id: Schema.ObjectId,
    questionText: {
      type: String,

      minlength: 3,
    },
    correct: {
      type: String,
      // required: true,
    },
    answerOption: [{ answerText: String, isCorrect: Boolean }],
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchama);

module.exports = Question;
