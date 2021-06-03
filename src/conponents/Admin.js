import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";

const Admin = ({ history }) => {
  // const [key, setKey] = useState(null);
  const [number, setNumber] = useState(0);
  const ref = useRef();
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
      <div
        className="number"
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: "2rem",
        }}>
        <p>Enter Number of Questions</p>
        <input
          type="number"
          ref={ref}
          value={number ? number : ""}
          placeholder="0"
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <Button onClick={() => history.push("/admin/question/" + number)}>
          Submit
        </Button>
      </div>
      {/* <Form /> */}
    </div>
  );
};

export default Admin;
