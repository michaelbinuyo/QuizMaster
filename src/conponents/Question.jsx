import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import question from "../Quiz.json";

const Question = () => {
  const [questions, _] = useState(shuffle(question).filter((e, i) => i < 10));
  // generate rand from 0 -5
  //to be changed to btns
  const [rand, setRand] = useState(Math.floor(Math.random() * 5 + 1));
  const history = useHistory();
  // get the current question
  const current = parseInt(useParams().id);
  // console.log(current);
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

  window.addEventListener("keypress", (e) => {
    console.log(e, "for question");
  });

  // console.log(current, "id");
  function handleClick(e, index) {
    const pickedOption = e.target.innerText.slice(3);
    const answer = questions[current].correct;
    console.log(answer, pickedOption);
    if (pickedOption.includes(answer)) {
      // e.target.classLis;
      const no = current + 1;
      e.target.classList.add("correct");
      const ele = e.target.classList;
      if (window.location.pathname.split("=")[1]) {
        axios
          .post("http://localhost:5000/bonus/" + rand)
          .then((res) => console.log(res))
          .catch((err) => console.log(err.message));
      } else {
        axios
          .post("http://localhost:5000/user/" + rand)
          .then((res) => console.log(res))
          .catch((err) => console.log(err.message));
      }
      setTimeout(() => {
        // history.push("/q/" + no);
        ele.remove("correct");
        // window.location.href = "http://localhost:3000/q/" + no;
        history.push("/q/" + no);
        setTime(5);
        setRand(Math.floor(Math.random() * 5 + 1));
      }, 500);
    } else {
      // window.location.href =
      //   "http://localhost:3000/q/" + current + `?bonus=${current}`;
      history.push("/q/" + current + "bonus=" + current);
      setTime(5);
      setRand(Math.floor(Math.random() * 5 + 1));

      axios
        .post("http://localhost:5000/wrong/" + rand)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
    }
    console.log(answer, current + 1);
  }

  const entities = {
    "&#039;": "&#039;",
    "&quot;": "&quot;",
    // add more if needed
  };
  const obj = ["A", "B", "C", "D"];
  const [time, setTime] = useState(5);
  const [qtime, setqTime] = useState(false);
  const [state, setState] = useState(0);
  useEffect(() => {
    const no = current + 1;

    const interval = setInterval(() => {
      const newTime = time - 1;
      setTime(newTime);
    }, 2000);
    if (time <= 0 && !qtime) {
      clearInterval(interval);
      history.push("/q/" + no);
      setTime(5);
      setRand(Math.floor(Math.random() * 5 + 1));
    } else if (time <= 0 && qtime) {
      history.push("/q/" + current + "bonus=" + current);
      setTime(5);
      setRand(Math.floor(Math.random() * 5 + 1));
      axios
        .post("http://localhost:5000/wrong/" + rand)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
      setqTime(false);
    }

    if (current === 0 && state < 1) {
      let questions = shuffle(question).filter((e, i) => i < 10);
      // window.localStorage.setItem("questions", JSON.stringify(questions));
      // setQuestion(window.localStorage.getItem("questions"));
      // console.log(state);
    }
    if (rand > 0 && state < 1) {
      setTime(10);
      setqTime(true);
      setState(1);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time, current, history, state, qtime, rand]);

  return (
    <>
      {current < 9 ? (
        <div className="question">
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
              {/* <p>
            <span>
              score
            </span>
            /{questions.length}
          </p> */}
              <span>{time}</span>
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
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    handleClick(e, i);
                  }}>
                  {obj[i] +
                    ". " +
                    e.answerText.replace(
                      /&#?\w+;/g,
                      (match) => entities[match]
                    )}
                </button>
              );
            })}
            {/* <p>Contester {rand} have the floor</p> */}
          </div>
        </div>
      ) : (
        history.push("/score")
      )}
    </>
  );
};

export default Question;
