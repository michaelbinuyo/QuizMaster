function mutateArr(question) {
  const obj = { A: 0, B: 1, C: 2, D: 3 };
  const arr = question.map((e) => {
    const questionText = e.questionText;
    const answerOption = [
      { answerText: e.option1 },
      { answerText: e.option2 },
      { answerText: e.option3 },
      { answerText: e.option4 },
    ];
    answerOption.map((ele, i) => {
      ele.isCorrect = obj[e.correct] == i ? true : false;
    });
    let correct = answerOption[obj[e.correct]].answerText;
    return JSON.stringify({ questionText, answerOption, correct });
  });user

  return arr;
}
module.exports = mutateArr;

// const questions = require("./Quiz_Bank.json");
// const cleaned = [];
// const q = questions.map((question) => {
//   if (cleaned)
//     cleaned.map((qu) => {
//       if (qu.questionText != question.questionText) cleaned.push(question);
//     });
//   // else
//   // cleaned.push(question);
//   console.log(questions.length, cleaned.length);
// });
