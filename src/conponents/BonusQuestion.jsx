import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { intervalLimit } from "../utils/stringConstants";
import firebase from "../utils/firebase";

import T from "./Table";
// import questions from "../Quiz.json";
class BonusQuestion extends Component {
  constructor(props) {
    super(props);
    this.questions = props.questions;
    let [questionIndex, user] = this.props.match.params.id.split("=");
    this.user = Number(user.slice(5));
    this.questionIndex = parseInt(questionIndex);
    this.question = props.questions[questionIndex];
    this.nextQuestionIndex = this.questionIndex + 1;
    this.nextQuestionUrl = "/q/" + this.nextQuestionIndex;

    this.history = this.props.history;
    console.log(this.questionIndex, "last user is", this.user);

    this.handleClick = (e, index) => {
      const { questionIndex, questions, nextQuestionIndex, history } = this;
      const pickedOption = e.target.innerText.slice(3);
      const answer = questions[questionIndex].correct;
      console.log(answer, pickedOption);
      if (pickedOption.includes(answer)) {
        // e.target.classLis;
        e.target.classList.add("correct");
        const ele = e.target.classList;

        setTimeout(() => {
          ele.remove("correct");
          // history.push("/q/" + nextQuestionIndex);
          // setTime(5);
          // setRand(Math.floor(Math.random() * 5 + 1));
        }, 500);
      } else {
      }
      console.log(answer, nextQuestionIndex);
    };
  }
  state = {
    time: 5,
    rand: Math.floor(Math.random() * 5 + 1),
  };

  componentDidMount() {
    const { time } = this.state;
    const { history } = this.props;
    this.myInterval = setInterval(() => {
      if (time > 0) {
        this.setState(({ time }) => ({
          time: time - 1,
        }));
      }
    }, intervalLimit);
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
                  const obj = { A: 0, B: 1, C: 2, D: 3 };

                  const answerIndex = obj[option[i][0]];
                  const picked =
                    this.question.answerOption[answerIndex].answerText;
                  const correctAnswer = this.question.correct;
                  console.log(answerIndex, correctAnswer, picked);
                  if (picked === correctAnswer) {
                    history.push(this.nextQuestionUrl);
                    clearInterval(this.myInterval);
                  }

                  clearInterval(this.myInterval);

                  history.push(this.nextQuestionUrl);
                }
              }
            })
          )
        );
      });
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  componentDidUpdate() {
    console.log("some Changes");
  }

  render() {
    const obj = ["A", "B", "C", "D"];
    const entities = {
      "&#039;": "&#039;",
      "&quot;": "&quot;",
      // add more if needed
    };
    const { history } = this.props;
    const { time } = this.state;
    const { questionIndex, questions } = this;

    if (time <= 0) {
      clearInterval(this.myInterval);
      history.push("/q/" + this.nextQuestionIndex);
    }
    return (
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
            {/* <p>Contester {rand} have the floor</p> */}
          </div>
        </div>
        <T />
      </>
    );
  }
}
export default withRouter(BonusQuestion);
