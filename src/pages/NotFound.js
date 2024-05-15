import React from "react";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex p-10 flex-col text-4xl justify-center items-center">
      Not Found
      <img src="./images/error-404.png" className="btn-" alt="" />
      <Button
        onClick={() => navigate("/login", { replace: true })}
        title="Back to Home"
        variant="dark"
      />
    </div>
  );
};

export default NotFound;
