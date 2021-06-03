import React from "react";

const Inputs = () => {
  return (
    <div>
      <div className="qu">
        <label htmlFor="">Question</label>
        <textarea
          ref={(el) => (ref.current = el)}
          onChange={() => {
            console.log(ref.current.value);
          }}
        />{" "}
      </div>
      <div className="ans">
        <div className="option">
          <label htmlFor="">Option A</label>
          <textarea
            ref={(el) => (ref1.current = el)}
            onChange={() => {
              console.log(ref1.current.value);
            }}
          />{" "}
        </div>
        <div className="option">
          <label htmlFor="">Option B</label>
          <textarea
            ref={(el) => (ref2.current = el)}
            onChange={() => {
              console.log(ref2.current.value);
            }}
          />{" "}
        </div>
        <div className="option">
          <label htmlFor="">Option C</label>
          <textarea
            ref={(el) => (ref3.current = el)}
            onChange={() => {
              console.log(ref3.current.value);
            }}
          />{" "}
        </div>
        <div className="option">
          <label htmlFor="">Option D</label>
          <textarea
            cols="1"
            ref={(el) => (ref4.current = el)}
            onChange={() => {
              console.log(ref4.current.value);
            }}
          />{" "}
        </div>
      </div>
      <div className="correct-ans">
        <label htmlFor="">Correct Answer</label>
        <input
          type="text"
          ref={(el) => (ref5.current = el)}
          onChange={() => {
            console.log(ref5.current.value);
          }}
        />{" "}
      </div>
    </div>
  );
};

export default Inputs;
