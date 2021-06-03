const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchama = new Schema(
  {
    _id: Schema.ObjectId,

    name: {
      type: String,

      minlength: 3,
    },
    score: {
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model("Score", scoreSchama);

module.exports = Score;
