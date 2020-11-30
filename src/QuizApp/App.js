import React, { useEffect, useState } from "react";
import Question from "./conponents/Question";
import ScoreSection from "./conponents/ScoreSection";
import "./index.css";
import question from "./Quiz.json";
export default function App() {
  let questions = shuffle(question).filter((e, i) => i < 10);
  function shuffle(arr) {
    const newArr = [...arr];
    const Arr = [...newArr];
    newArr.forEach((e, i) => {
      const rand = Math.floor(Math.random() * Arr.length);
      newArr[i] = Arr[rand];
      Arr.splice(rand, 1);
    });
    return newArr;
  }
  const [current, setCurrent] = useState(0);
  const [board, setBoard] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (score);
  });
  const entities = {
    "&#039;": "'",
    "&quot;": '"',
    // add more if needed
  };
  return (
    <div className="app">
      {board ? (
        <ScoreSection score={score} questions={questions} />
      ) : (
        <Question
          entities={entities}
          setBoard={setBoard}
          questions={questions}
          current={current}
          setCurrent={setCurrent}
          setScore={setScore}
          score={score}
        />
      )}
    </div>
  );
}
