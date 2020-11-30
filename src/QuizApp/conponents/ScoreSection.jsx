import React from "react";
const ScoreSection = ({ score, questions }) => {
  return (
    <div className="score-section">
      <p style={{ textAlign: "center", width: "100%" }}>
        You scored {score} out of {questions.length}
      </p>
    </div>
  );
};

export default ScoreSection;
