import React, { useState, useEffect } from "react";
import Question from "./conponents/Question";
import ScoreSection from "./conponents/ScoreSection";
import "./index.css";
import Home from "./conponents/Home";
import Admin from "./conponents/Admin.js";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Forms } from "./conponents/F";
import BonusQuestion from "./conponents/BonusQuestion";
import axios from "axios";
import { questionApi, userApi } from "./utils/stringConstants";
export default function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [stamp, setStamp] = useState("");
  useEffect(() => {
    if (questions.length <= 0) {
      axios
        .get(questionApi)
        .then((res) => setQuestions(res.data))
        .catch((err) => console.log(err.message));
    }
    console.log(
      "from app.js",
      questions.map((q) => q.correct)
    );
  });
  return (
    <div className="app">
      {/* <img
        class="unilorin-logo"
        style={{}}
        src="https://images-na.ssl-images-amazon.com/images/I/71CLbFCxOaL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.png"
        alt="logo"
      /> */}
      <BrowserRouter>
        <Route path="/score" component={ScoreSection} />
        <Route path="/q/bonus/:id/">
          <BonusQuestion questions={questions} />
        </Route>
        <Route path="/q/:id" exact>
          <Question
            className="questions"
            questions={questions}
            setQuestions={setQuestions}
            stamp={stamp}
            setStamp={setStamp}
          />
        </Route>
        <Route path="/" exact>
          <Home questions={questions} />
        </Route>

        <Route path="/admin/questions/:id" component={Forms} />
        <Route path="/admin" exact component={Admin} />
      </BrowserRouter>
    </div>
  );
}
