import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
const T = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    // setUser(getData());
    axios
      .get("http://localhost:5000/user")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err.message));
  });
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Contestants</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {user.map((e, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{e.name}</td>
            <td>{e.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default T;
