import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="start">
      <NavLink to="q/0">
        <Button>Start</Button>
      </NavLink>
    </div>
  );
};

export default Home;
