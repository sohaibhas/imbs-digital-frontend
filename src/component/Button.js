import React from "react";

const Button = ({ variant, title, icon, onClick, type }) => {
  return (
    <>
      {variant === "primary" && (
        <button
          type={type}
          onClick={onClick}
          className="text-white bg-blue-700 flex gap-2 items-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {icon} {title}
        </button>
      )}
      {variant === "secondary" && (
        <button
          type={type}
          onClick={onClick}
          className="py-2.5 px-5 me-2 mb-2 text-sm flex gap-2 items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {icon} {title}
        </button>
      )}
      {variant === "dark" && (
        <button
          type={type}
          onClick={onClick}
          className="text-white bg-gray-800 flex gap-2 items-center hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {icon} {title}
        </button>
      )}
    </>
  );
};

export default Button;
