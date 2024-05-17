import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData?.role; // Use optional chaining to access 'role' safely

  return (
    <div>
      <ul className="flex flex-row gap-10 font-semibold text-white">
        <Link to="/">Dashboard</Link>
        {role === "admin" && <Link to="/business">Business</Link>}
        <Link to="/leads">Lead</Link>
        {role === "admin" && <Link to="/users">User</Link>}
      </ul>
    </div>
  );
};

export default Menu;
