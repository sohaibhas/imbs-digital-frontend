import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputText from "./InputText";
import { LeadModal } from "../constant";
import ModalSelect from "./Select";
import { useDispatch } from "react-redux";
import { addLead, getLead } from "../store/lead";
import Spinner from "./Spinner";


const Modal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // State to track if adding new lead

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const userDataString = localStorage.getItem("userData");

  const onSubmit = (data) => {
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const username = userData.name;
      const role = userData.role;
      setIsLoading(true);
      setIsAdding(true); // Set isAdding to true when adding new lead
      dispatch(addLead({ ...data, username: username, role: role }))
        .then(() => {
          dispatch(getLead());
          handleClose();
          reset();
          setIsLoading(false);
          setIsAdding(false); // Reset isAdding to false after action is completed
        })
        .catch(() => {
          setIsLoading(false);
          setIsAdding(false); // Reset isAdding to false on error
        });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-50">
          <div className="absolute bg-black opacity-60 inset-0"></div>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[60%] p-4 md:p-5">
            <div className="flex items-center justify-between border-b p-4 md:p-5 rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create Lead
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner />
                </div>
              ) : (
                <div className="grid gap-4 mb-4 grid-cols-2">
                  {LeadModal.map((inputField, index) => (
                    <div className="relative w-full z-0 mb-5 group" key={index}>
                      <InputText
                        label={inputField.label}
                        name={inputField.name}
                        errorTitle={inputField.errorTitle}
                        type={inputField.title}
                        variant={inputField.variant}
                        placeholder={inputField.placeholder}
                        register={register}
                        errors={errors}
                        title={inputField.title}
                      />
                    </div>
                  ))}
                  <div className="float-right">
                    <ModalSelect
                      name="status"
                      register={register}
                      options={options}
                      title={"Rate Your Experience"}
                    />
                    {errors.category && <p>This field is required</p>}
                  </div>
                </div>
              )}
              <div className="float-right">
                {!isLoading && (
                  <button
                    type="submit"
                    className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                      isAdding ? "hidden" : "" // Hide button if adding lead
                    }`}
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Add new Lead
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
