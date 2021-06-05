import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import T from "./Table";

class BonusQuestion extends Component {
  constructor(props) {
    super(props);
    this.questions = props.questions;
    let [questionIndex, user] = this.props.match.params.id.split("=");
    this.user = user.slice(4);
    this.questionIndex = parseInt(questionIndex);

    this.nextQuestionIndex = this.questionIndex + 1;
    this.history = this.props.history;
    console.log(this.questionIndex, this.user);

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
        // history.push("/q/" + questionIndex + "bonus=" + questionIndex);
        // setTime(5);
        // setRand(Math.floor(Math.random() * 5 + 1));
        //   axios
        //     .post("http://localhost:5000/wrong/" + rand)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err.message));
        //
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
    this.myInterval = setInterval(() => {
      if (time > 0) {
        this.setState(({ time }) => ({
          time: time - 1,
        }));
      }
    }, 1000);
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
    console.log(time);
    const {
      questionIndex,
      questions,

      handleClick,
    } = this;

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
        <T />
      </>
    );
  }
}
export default withRouter(BonusQuestion);
