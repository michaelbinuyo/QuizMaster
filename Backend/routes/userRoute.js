const express = require("express");
const { model } = require("mongoose");
const Score = require("../contestantModel");
const {
  increaseScore,
  reduceScore,
  deleteAllScore,
  getAllData,
  bonusScore,
} = require("../controller/userController");

const router = express.Router();
router.route("/user").get(getAllData).delete(deleteAllScore);
router.route("/user/:id").post(increaseScore).get(reduceScore).put(bonusScore);
module.exports = router;
