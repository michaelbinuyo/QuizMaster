import React, { useState } from "react";
import Table from "./Table";
const ScoreSection = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      {!clicked ? (
        <div
          onClick={() => {
            setClicked(true);
          }}
          className="score-section">
          <p style={{ textAlign: "center", width: "100%", cursor: "pointer" }}>
            End Quiz
          </p>
        </div>
      ) : (
        <Table></Table>
      )}
    </>
  );
};

export default ScoreSection;
