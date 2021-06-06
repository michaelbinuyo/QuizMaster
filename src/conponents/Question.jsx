import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import T from "./Table";
import { intervalLimit } from "../utils/stringConstants";
import firebase from "../utils/firebase";

const Question = ({ questions }) => {
  const history = useHistory();
  // get the questionIndex question
  const questionIndex = parseInt(useParams().id);
  // console.log(questionIndex);
  const bonusUrl = `/q/bonus/${questionIndex}=user${user}`;

  // console.log(questionIndex, "id");

  const entities = {
    "&#039;": "&#039;",
    "&quot;": "&quot;",
    // add more if needed
  };
  const [user, setUser] = useState(0);
  const obj = ["A", "B", "C", "D"];
  const [time, setTime] = useState(10);
  const nextQuestionIndex = questionIndex + 1;
  const nextQuestionUrl = "/q/" + nextQuestionIndex;
  const question = questions[questionIndex];
  let final = "";

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = time - 1;
      setTime(newTime);
    }, intervalLimit);
    //COme back here ->
    if (!user)
      firebase
        .database()
        .ref()
        .on("value", (snapshot) => {
          Object.values(
            Object.values(
              snapshot.forEach((snap, i) => {
                const option = snap.val();
                for (let i in option) {
                  if (option[i] !== "no ans") {
                    setUser(10);
                    console.log(option[i]);
                    // history.push(nextQuestionUrl);
                  }
                }
              })
            )
          );
          console.log(user);
        });

    if (time <= 0) {
      clearInterval(interval);
      setTime(10);
      history.push(nextQuestionUrl);
    }

    return () => {
      clearInterval(interval);
    };
  }, [history, question, user, nextQuestionUrl, time]);
  // const ref = useRef();
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
                {question.questionText.replace(
                  /&#?\w+;/g,
                  (match) => entities[match]
                )}
              </div>
            </div>
            <div className="answer-section">
              {questions[questionIndex].answerOption.map((e, i) => {
                return (
                  <button key={i}>
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
