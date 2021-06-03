import React from "react";
import { NavLink } from "react-router-dom";
const Confirmation = () => {
  return (
    <div className="confirm">
      <p>Question has been Sent to the DataBase</p>
      <NavLink to="/">You can Now start</NavLink>
    </div>
  );
};

export default Confirmation;
