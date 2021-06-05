const express = require("express");

const router = express.Router();
const {
  postQuestions,
  getQuestions,
} = require("../controller/questionController");

router.route("/").get(getQuestions).post(postQuestions);
module.exports = router;
