import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <ul className="flex flex-row gap-10 font-semibold text-white">
        <Link to="/">Dashboard</Link>
        <Link to="/business">Business</Link>
        <Link to="/leads">Lead</Link>
        <Link to="/users">User</Link>
      </ul>
    </div>
  );
};

export default Menu;
