const express = require("express");

const router = express.Router();
const {
  postQuestions,
  getQuestions,
  deleteQuestion,
} = require("../controller/questionController");

router.route("/").get(getQuestions).post(postQuestions).delete(deleteQuestion);
module.exports = router;
