import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import T from "./Table";
const Question = ({ questions }) => {
  const user = 2;
  const history = useHistory();
  // get the questionIndex question
  const questionIndex = parseInt(useParams().id);
  // console.log(questionIndex);
  const bonusUrl = `/q/bonus/${questionIndex}=user${user}`;

  // console.log(questionIndex, "id");
  function handleClick(e, index) {
    const pickedOption = e.target.innerText.slice(3);
    const answer = questions[questionIndex].correct;
    console.log(answer, pickedOption);
    if (pickedOption.includes(answer)) {
      // e.target.classLis;
      const nextQuestionIndex = questionIndex + 1;
      e.target.classList.add("correct");
      const ele = e.target.classList;

      axios
        .post("http://localhost:5000/user/" + user)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));

      setTimeout(() => {
        // history.push("/q/" + nextQuestionIndex);
        ele.remove("correct");
        // window.location.href = "http://localhost:3000/q/" + nextQuestionIndex;
        history.push("/q/" + nextQuestionIndex);
        setTime(10);
      }, 500);
    } else {
      // window.location.href =
      //   "http://localhost:3000/q/" + questionIndex + `?bonus=${questionIndex}`;

      axios
        .post("http://localhost:5000/wrong/" + user)
        .then(() => history.push(bonusUrl))
        .catch((err) => console.log(err.message));
      setTime(5);
    }
    console.log(answer, questionIndex + 1);
  }

  const entities = {
    "&#039;": "&#039;",
    "&quot;": "&quot;",
    // add more if needed
  };
  const obj = ["A", "B", "C", "D"];
  const [time, setTime] = useState(10);
  const nextQuestionIndex = questionIndex + 1;
  // localhost:3000/q/bonus/0=user1
  // http: console.log(bonusUrl);
  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = time - 1;
      setTime(newTime);
    }, 5000000);
    if (time <= 0) {
      clearInterval(interval);
      history.push(bonusUrl);
      // history.push("/q/" + questionIndex + "bonus=" + questionIndex);
      // history.push(
      //   "/q/" + "bonus=" + questionIndex + "user=" + nextQuestionIndex
      // );
    }

    // window.localStorage.setItem("questions", JSON.stringify(questions));
    // setQuestion(window.localStorage.getItem("questions"));
    // console.log(state);

    return () => {
      clearInterval(interval);
    };
  }, [time, questionIndex, nextQuestionIndex, history, user, bonusUrl]);

  return (
    <>
      {questionIndex < 9 ? (
        <>
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
                  <span>Question {questionIndex + 1}</span>
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
                {questions[questionIndex].questionText.replace(
                  /&#?\w+;/g,
                  (match) => entities[match]
                )}
              </div>
            </div>
            <div className="answer-section">
              {questions[questionIndex].answerOption.map((e, i) => {
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
              {/* <p>Contester {user} have the floor</p> */}
            </div>
          </div>
          <T />
        </>
      ) : (
        history.push("/score")
      )}
    </>
  );
};

export default Question;
