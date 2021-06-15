import React, { useRef } from "react";

function FormRow({ index, setQuestions, refs, r }) {
  const ref = useRef([]);
  ref.current = [0, 0, 0, 0, 0, 0].map((_, i) => React.createRef());
  var values = ref.current.map((e) => e.value);
  // ref.map((e) => console.log(e));
  const handleChange = (e, index) => {
    var keys = [
      "questionText",
      "option1",
      "option2",
      "option3",
      "option4",
      "correct",
    ];
    index = index + 1;
    const { name, value } = ref.current[index];
    console.log(name, value);
    // console.log(ref);
    var result = {};
    keys.forEach((key, i) => (result[key] = values[index]));
    // refs.current = result;
    // console.log(refs);
    // const { name, value } = e.target;
    // // setQuestion((pre) => ({ ...pre, [name]: value }));
    // // setQuestions((p) => ({ ...p, [index]: refs.current }));
    // console.log(name, value, index, refs.current);
  };
  const optionConstants = ["A", "B", "C", "D"];

  return (
    <div>
      {
        <>
          <div className="qu">
            <label htmlFor="questionText">Question {index + 1}</label>
            <textarea
              name="questionText"
              ref={(el) => (ref.current[0] = el)}
              onChange={(e) => handleChange(e, -1)}
            />{" "}
          </div>
          <div className="ans">
            {optionConstants.map((e, i) => (
              <div className="option" key={i}>
                <label htmlFor="">Option {e}</label>
                <textarea
                  name={"answerText" + (i + 1)}
                  ref={(el) => (ref.current[i + 1] = el)}
                  onChange={(e) => handleChange(e, i)}
                />{" "}
              </div>
            ))}
          </div>
          <div className="correct-ans">
            <label htmlFor="">Correct Answer</label>

            <select
              name="correct"
              onChange={(e) => handleChange(e, 4)}
              ref={(el) => (ref.current[5] = el)}
            >
              <option value="" disabled selected>
                Pick Answer
              </option>
              {optionConstants.map((e, i) => (
                <option name={e} key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </>
      }
    </div>
  );
}
export default FormRow;
