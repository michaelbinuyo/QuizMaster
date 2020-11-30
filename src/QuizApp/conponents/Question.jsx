import React from "react";
const Question = ({
  current,
  entities,
  questions,
  setCurrent,
  setScore,
  setBoard,
  score,
}) => {
  function handleClick(index) {
    if (current < questions.length - 1) setCurrent(current + 1);
    else setBoard(true);
    if (questions[current].answerOption[index].isCorrect)
      setScore((p) => p + 1);
  }
  return (
    <>
      <div className="question-section">
        <div
          className="question-count"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}>
          <p>
            <span>Question {current + 1}</span>
          </p>
          <p>
            <span>
              score
              <span>{score}</span>
            </span>
            /{questions.length}
          </p>
        </div>
        <div className="question-text">
          {questions[current].questionText.replace(
            /&#?\w+;/g,
            (match) => entities[match]
          )}
        </div>
      </div>
      <div className="answer-section">
        {questions[current].answerOption.map((e, i) => {
          if (e.isCorrect) console.log(e);
          return (
            <button
              key={i}
              onClick={() => {
                handleClick(i);
              }}>
              {e.answerText.replace(/&#?\w+;/g, (match) => entities[match])}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Question;
