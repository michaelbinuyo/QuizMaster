import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import T from "./Table";
import { intervalLimit, userScoreApi } from "../utils/stringConstants";
import firebase from "../utils/firebase";

const Question = ({ questions, stamp, setStamp }) => {
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
  const ref = useRef([]);
  ref.current = [0, 0, 0, 0].map((_, i) => React.createRef());
  // var values = ref.current.map((e) => e.value);
  const [user, setUser] = useState(0);
  const obj = ["A", "B", "C", "D"];
  const [time, setTime] = useState(10);
  const nextQuestionIndex = questionIndex + 1;
  const nextQuestionUrl = "/q/" + nextQuestionIndex;
  const question = questions[questionIndex];
  console.log("The correct answer is", question.correct);
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
                  if (option[i] !== "no ans" && option[1] !== stamp) {
                    const obj = { A: 0, B: 1, C: 2, D: 3 };

                    const answerIndex = obj[option[i][0]];
                    const picked =
                      question.answerOption[answerIndex].answerText;
                    const correctAnswer = question.correct;
                    setStamp(option[i]);
                    const url = userScoreApi + option[i][1];
                    console.log(answerIndex, correctAnswer, picked, url);
                    if (picked === correctAnswer) {
                      // clearInterval(interval);
                      ref.current.map((e, i) => {
                        if (i === answerIndex) {
                          console.log(e);
                          e.classList.add("correct");
                        }
                      });
                      setTimeout(() => {
                        axios
                          .post(url)
                          .then((res) => {
                            history.push(nextQuestionUrl);
                            ref.current.map((e, i) => {
                              if (i === answerIndex) {
                                console.log(e);
                                e.classList.remove("correct");
                              }
                            });
                          })
                          .catch((err) => console.log(err.message));
                      }, 1000);
                    } else {
                      ref.current.map((e, i) => {
                        if (i === answerIndex) {
                          console.log(e);
                          e.classList.add("wrong");
                        }
                      });
                      setTimeout(() => {
                        axios.get(url).then((res) => {
                          history.push(nextQuestionUrl);
                          ref.current.map((e, i) => {
                            if (i === answerIndex) {
                              console.log(e);
                              e.classList.remove("wrong");
                            }
                          });
                        });
                      }, 1000);
                    }
                  }
                }
              })
            )
          );
          // console.log(user);
        });

    if (time <= 0) {
      clearInterval(interval);
      setTime(10);
      history.push(nextQuestionUrl);
    }

    return () => {
      clearInterval(interval);
    };
  }, [history, question, user, nextQuestionUrl, time, setStamp, stamp]);
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
                  <button key={i} ref={(el) => (ref.current[i] = el)}>
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
