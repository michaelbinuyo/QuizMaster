import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { userApi } from "../utils/stringConstants";

const Home = ({ questions, history }) => {
  useEffect(() => {
    axios
      .delete(userApi)
      .then((res) => console.log(res.data))
      .catch((err) => setError(err.message));
  }, []);
  const [dot, setDot] = useState(1);
  const [error, setError] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const nowDot = dot + 1;
      setDot(nowDot);
    }, 500);
    //COme back here ->
    if (dot > 3) {
      // clearInterval(interval);
      setDot(1);
      // setTime(10);
      // history.push(nextQuestionUrl);
    }
    return () => {
      clearInterval(interval);
    };
  }, [dot]);

  return (
    <div className="start">
      {questions.length > 0 ? (
        <Button onClick={() => history.push("/q/0")}>Start</Button>
      ) : (
        <div style={{ display: "block" }}>
          <div className="primary" style={{ color: "var(--primary)" }}>
            Loading{".".repeat(dot)}
          </div>
          {error && <h1 style={{ color: "var(--danger)" }}> {error}</h1>}
        </div>
      )}
    </div>
  );
};

export default withRouter(Home);
