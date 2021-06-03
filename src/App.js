import React, { useState } from "react";
import Question from "./conponents/Question";
import ScoreSection from "./conponents/ScoreSection";
import "./index.css";
import question from "./Quiz.json";
import T from "./conponents/Table";
import Home from "./conponents/Home";
import Admin from "./conponents/Admin.js";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Forms } from "./conponents/F";
export default function App() {
  const [score, setScore] = useState(0);
  // useEffect(() => {});

  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/score" component={ScoreSection} />

        <Route path="/q/:id">
          <Question
            className="question"
            // questions={questions}
            setScore={setScore}
            score={score}
          />
          <T />
        </Route>
        <Route path="/" exact component={Home} />

        <Route path="/admin/question/:id" component={Forms} />
        <Route path="/admin" exact component={Admin} />
      </BrowserRouter>
    </div>
  );
}
