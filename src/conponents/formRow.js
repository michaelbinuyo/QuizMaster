import React, { useRef, useState } from "react";

function FormRow({ index, setQuestions, refs, r }) {
  const [question, setQuestion] = useState({});
  const ref = useRef([]);
  ref.current = [0, 0, 0, 0, 0, 0].map((_, i) => React.createRef());
  // ref.map((e) => console.log(e));
  const handleChange = (e, i) => {
    var keys = [
      "questionText",
      "option1",
      "option2",
      "option3",
      "option4",
      "correct",
    ];
    var values = ref.current.map((e) => e.value);
    var result = {};
    keys.forEach((key, i) => (result[key] = values[i]));
    refs.current = result;
    console.log(refs);
    const { name, value } = e.target;
    // setQuestion((pre) => ({ ...pre, [name]: value }));
    setQuestions((p) => ({ ...p, [index]: refs.current }));
    console.log(name, value, index, refs.current);
  };
  const optionConstants = ["A", "B", "C", "D"];

  return (
    <div>
      {
        <>
          <div className="qu">
            <label htmlFor="question">Question {index + 1}</label>
            <textarea
              name="question"
              ref={(el) => (ref.current[0] = el)}
              onChange={(e) => handleChange(e, -1)}
            />{" "}
          </div>
          <div className="ans">
            {optionConstants.map((e, i) => (
              <div className="option" key={i}>
                <label htmlFor="">Option {e}</label>
                <textarea
                  name="option1"
                  ref={(el) => (ref.current[i + 1] = el)}
                  onChange={(e) => handleChange(e, i)}
                />{" "}
              </div>
            ))}
          </div>
          <div className="correct-ans">
            <label htmlFor="">Correct Answer</label>

            <select
              name="answerText"
              onChange={(e) => handleChange(e, 5)}
              ref={(el) => (ref.current[5] = el)}>
              <option value="" disabled selected>
                Pick Answer
              </option>
              {optionConstants.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </select>
          </div>
        </>
      }
    </div>
  );
}
export default FormRow;
