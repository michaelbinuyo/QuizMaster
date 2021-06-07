import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import T from "./Table";
import { intervalLimit, userScoreApi } from "../utils/stringConstants";
import firebase from "../utils/firebase";

const Question = ({ questions, setQuestions }) => {
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
  const [state, setState] = useState(10);
  const obj = ["A", "B", "C", "D"];
  const [time, setTime] = useState(15);
  const nextQuestionIndex = questionIndex + 1;
  const nextQuestionUrl = "/q/" + nextQuestionIndex;
  const [question, setQuestion] = useState(questions[0]);
  const [user, setUser] = useState(0);

  let answer = "";
  const handleClick = () => {
    setTime(15);
    // questions.shift();
    // history.push("/q/" + Number(questionIndex + 1));
    const obj = { A: 0, B: 1, C: 2, D: 3 };

    const contestant = user.ans[1];
    const answerIndex = obj[user.ans[0]];
    const { isCorrect } = user;
    ref.current.map((e, i) => {
      if (i === answerIndex) {
        e.classList.add("pick");
      }
    });
    setTimeout(() => {
      if (isCorrect) {
        ref.current.map((e, i) => {
          if (i === answerIndex) {
            e.classList.remove("pick");

            e.classList.add("correct");
          }
        });
      } else {
        ref.current.map((e, i) => {
          if (i === answerIndex) {
            e.classList.remove("pick");

            e.classList.add("wrong");
          }
        });
      }
    }, 2000);
    setTimeout(() => {
      console.log(contestant, isCorrect);
      if (isCorrect)
        axios.post(userScoreApi + contestant).then((res) => {
          ref.current.map((e, i) => {
            if (i === answerIndex) {
              e.classList.remove("wrong");
              e.classList.remove("correct");
            }
          });

          setQuestions(questions.filter((e, i) => i > 0));

          history.push(nextQuestionUrl);
        });
      else
        axios.get(userScoreApi + contestant).then((res) => {
          ref.current.map((e, i) => {
            if (i === answerIndex) {
              e.classList.remove("correct");
              e.classList.remove("wrong");
            }
          });
          setQuestions(questions.filter((e, i) => i > 0));

          history.push(nextQuestionUrl);
        });
    }, 5000);
  };
  firebase
    .database()
    .ref()
    .on("value", (snapshot) => {
      Object.values(
        Object.values(
          snapshot.forEach((snap, i) => {
            const option = snap.val();
            for (let i in option) {
              if (option[i] !== "no ans" && !user) {
                const obj = { A: 0, B: 1, C: 2, D: 3 };

                const answerIndex = obj[option[i][0]];
                const picked = question.answerOption[answerIndex].answerText;
                const correctAnswer = question.correct;
                const isCorrect = correctAnswer === picked;

                setUser({ ans: option[i], isCorrect: isCorrect });
                console.log(option[i], correctAnswer, picked, user);
                answer = option[i];
              }
            }
          })
        )
      );
      // console.log(user);
    });

  useEffect(() => {
    console.log(questions);

    const interval = setInterval(() => {
      const newTime = time - 1;
      setTime(newTime);
    }, intervalLimit);
    //COme back here ->
    if (time <= 0) {
      clearInterval(interval);
      // setTime(10);
      // history.push(nextQuestionUrl);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, questions]);
  // const ref = useRef();

  return (
    <>
      {questions.length > 0 && nextQuestionIndex < 5 ? (
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
              <button onClick={handleClick}>Next</button>
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
