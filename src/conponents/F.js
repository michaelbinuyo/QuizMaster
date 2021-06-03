import React, { useRef, useState } from "react";
import { Form as FormElement } from "./Admin.element";
import { Button } from "react-bootstrap";
// import axios from "axios";
import firebase from "../utils/firebase";
import Confirmation from "./confimation";
import FormRow from "./formRow";
export const Forms = ({ match }) => {
  const id = match.params.id;
  const [questions, setQuestions] = useState({});
  // const q = 10;
  // const ref = useRef();
  // const ref1 = useRef();
  // const ref2 = useRef();
  // const ref3 = useRef();
  // const ref4 = useRef();
  // const ref5 = useRef();
  const [submit, setSubmit] = useState(false);
  let filledArray = [...new Array(Number(id))].map((_, i) => i);
  //   useEffect(() => {
  //     console.log(ref);
  //   });
  // console.log(props);
  const ref = useRef([]);
  ref.current = filledArray.map((_, i) => React.createRef());

  // console.log(ref);
  const createQuestions = () => {
    const createRef = firebase.database().ref("Questions");
    const create = {
      ...questions,
    };
    createRef.update(create);
  };
  return (
    <FormElement
      onSubmit={(e) => {
        e.preventDefault();

        console.log("Submit", questions);
        // createQuestions();
        // setSubmit(true);
        // }
      }}
      className="admin">
      {!submit ? (
        <>
          {filledArray.map((e, i) => (
            <FormRow
              key={i}
              index={i}
              refs={ref.current[i]}
              setQuestions={setQuestions}
            />
          ))}
          <Button type="submit">Submit</Button>
        </>
      ) : (
        <Confirmation />
      )}
    </FormElement>
  );
};
