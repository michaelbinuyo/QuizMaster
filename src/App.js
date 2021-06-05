import React, { useState, useEffect } from "react";
import Question from "./conponents/Question";
import ScoreSection from "./conponents/ScoreSection";
import "./index.css";
import questionBank from "./Quiz.json";
import Home from "./conponents/Home";
import Admin from "./conponents/Admin.js";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Forms } from "./conponents/F";
import BonusQuestion from "./conponents/BonusQuestion";
import shuffle from "./temp";
import firebase from "./utils/firebase";
export default function App() {
  // var starCountRef = firebase.database().ref("posts/" + postId + "/starCount");
  // starCountRef.on("value", (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });
  const [score, setScore] = useState(0);
  useEffect(() => {
    console.log("from app.js");
  });
  let questions = shuffle(questionBank).filter((e, i) => i < 10);
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/score" component={ScoreSection} />
        <Route path="/q/bonus/:id/">
          <BonusQuestion questions={questions} />
        </Route>
        <Route path="/q/:id" exact>
          <Question
            className="question"
            questions={questions}
            setScore={setScore}
            score={score}
          />
        </Route>
        <Route path="/" exact component={Home} />

        <Route path="/admin/question/:id" component={Forms} />
        <Route path="/admin" exact component={Admin} />
      </BrowserRouter>
    </div>
  );
}
