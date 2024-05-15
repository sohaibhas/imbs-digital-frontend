import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({ isOpen, setIsOpen, EditComp, handleDelete }) => {
  return (
    <>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md overflow-hidden shadow-lg z-50">
          <div className="flex flex-col">
            <Link to={EditComp}>
              <button
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                onClick={() => console.log("Edit clicked")}
              >
                Edit
              </button>
            </Link>
            <button
              className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
              onClick={() => console.log("View clicked")}
            >
              View
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DropDown;
