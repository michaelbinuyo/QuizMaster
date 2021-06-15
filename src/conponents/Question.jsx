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
  const [answered, setAnswered] = useState(0);
  const obj = ["A", "B", "C", "D"];
  const [time, setTime] = useState(15);
  const nextQuestionIndex = questionIndex + 1;
  const nextQuestionUrl = "/q/" + nextQuestionIndex;
  // eslint-disable-next-line
  const [question, setQuestion] = useState(questions[0]);
  const [user, setUser] = useState({});
  // user={ans:"A1",isCorrect:true}
  useEffect(() => {
    setQuestion(questions[0]);
    setTime(15);
    console.log(user);
  }, [questions, user]);
  const handleClick = () => {
    //check user
    if (Object.keys(user).length > 0) {
      const { ans, isCorrect } = user;
      const obj = { A: 0, B: 1, C: 2, D: 3 };
      const contestant = ans[1];
      const answerIndex = obj[ans[0]];

      //check correct in Dom
      ref.current.map((e, i) => {
        e.classList.remove("pick");
        e.classList.remove("correct");
        e.classList.remove("wrong");

        if (i === answerIndex && isCorrect) {
          e.classList.add("correct");
        } else if (i === answerIndex) e.classList.add("wrong");
        return null;
      });
      setTimeout(() => {
        if (isCorrect) {
          axios
            .post(userScoreApi + contestant)
            .then((res) => {
              setQuestions((questions) =>
                questions.filter((_, index) => index > 0)
              );
              ref.current.map((e) => e.classList.remove("correct"));
              userLength = 0;
              setUser({});
              setAnswered((p) => p + 1);
            })

            .catch((err) => console.log(err.message));
        } else {
          axios
            .get(userScoreApi + contestant)
            .then((res) => {
              setQuestions((questions) =>
                questions.filter((_, index) => index > 0)
              );
              ref.current.map((e) => e.classList.remove("wrong"));
              userLength = 0;
              setUser({});
              setAnswered((p) => p + 1);
            })
            .catch((err) => console.log(err.message));
        }
      }, 1000);
    }
  };

  // const answer = "";
  let userLength = Object.keys(user).length;
  firebase
    .database()
    .ref()
    .on("value", (snapshot) => {
      if (userLength === 0) {
        Object.values(
          Object.values(
            snapshot.forEach((snap, i) => {
              const option = snap.val();
              for (let i in option) {
                if (option[i] !== "no ans") {
                  console.log(userLength);
                  const obj = { A: 0, B: 1, C: 2, D: 3 };

                  const answerIndex = obj[option[i][0]];
                  const picked = question.answerOption[answerIndex].answerText;
                  const correctAnswer = question.correct;
                  const isCorrect = correctAnswer === picked;

                  // setUser();
                  const u = { ans: option[i], isCorrect: isCorrect };
                  console.log(answerIndex, u);
                  handleOption(answerIndex, u);
                  // answer = option[i];
                }
              }
            })
          )
        );
      }
      // console.log(user);
    });

  //timer effect
  useEffect(() => {
    // console.log(question);

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
  }, [time]);
  // const ref = useRef();
  const handleOption = (index, data) => {
    // const text=
    // const element = ref.current[index];
    const picked = question.answerOption[index];
    const contestant = data.ans;
    console.log(contestant[1]);
    const obj = { A: 0, B: 1, C: 2, D: 3 };
    const option = Object.keys(obj).find((key) => obj[key] === index);
    const { answerText, isCorrect } = picked;
    console.log(answerText, isCorrect, option);
    setUser(data);
    userLength = 2;
    // console.log(ref);

    ref.current.map((e, i) => {
      if (e.current === undefined) {
        e.classList.remove("pick");
        e.classList.remove("correct");
        e.classList.remove("wrong");
      }

      if (i === index) {
        if (e.current === undefined) {
          e.classList.add("pick");
          console.log(e);
        }
      }
      return null;
    });
  };
  const questionLength = questions.length + answered;
  return (
    <>
      {questions.length > 0 ? (
        <>
          <div className="question">
            <div className="question-section">
              <div
                className="question-count"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <p>
                  <span>
                    Question {answered + 1}/{questionLength}
                  </span>
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
              {question.answerOption.map((e, i) => {
                return (
                  <button
                    key={i}
                    ref={(el) => (ref.current[i] = el)}
                    // onClick={() => handleOption(i)}
                  >
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

              <div className="click">
                {Object.keys(user).length ? (
                  <button className="btn" onClick={handleClick}>
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
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
