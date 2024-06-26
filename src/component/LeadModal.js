import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addChat, deleteLead, getLead, updateLead } from "../store/lead";

const LeadModal = ({ openLead, setOpenLead, selectedData }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(selectedData);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditMode(true);
    setFormData(selectedData);
  };

  const handleNewChat = async () => {
    await dispatch(addChat({ id: selectedData._id, data: { message } }));
  };

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;

  const handleDelete = async () => {
    await dispatch(deleteLead({ id: selectedData._id }));
    setOpenLead(false);
    dispatch(getLead());
    setEditMode(false);
    setFormData({});
  };

  const handleSave = () => {
    dispatch(updateLead({ id: formData._id, data: formData }));
    dispatch(getLead());
    setEditMode(false);
    setOpenLead(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    openLead && (
      <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-50">
        <div className="absolute bg-black opacity-60 inset-0"></div>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                {editMode ? (
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                ) : (
                  selectedData.customerName
                )}
              </h1>
              <div className="flex space-x-2">
                {editMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-20 h-8 inline-flex justify-center items-center"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-20 h-8 inline-flex justify-center items-center"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {role === "admin" && (
                      <>
                        <button
                          onClick={handleEdit}
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-20 h-8 inline-flex justify-center items-center"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-20 h-8 inline-flex justify-center items-center"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
                <button
                  onClick={() => {
                    setOpenLead(false);
                    setEditMode(false);
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    selectedData.phoneNumber
                  )}
                </p>
                <p>
                  <strong>Address:</strong> {selectedData.city},{" "}
                  {selectedData.country}
                </p>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Purpose</h2>
                  {editMode ? (
                    <textarea
                      type="text"
                      name="purpose"
                      rows="2"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <>
                      <p>{selectedData.purpose}</p>
                      {selectedData.chat.map((chat, index) => (
                        <React.Fragment key={index}>
                          <p className="font-bold">
                            {moment(chat?.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </p>
                          <p>{chat?.message}</p>
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Lead Details</h2>
                <p>
                  <strong>Profession:</strong>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    selectedData.profession
                  )}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {editMode ? (
                    <input
                      type="number"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    selectedData.status
                  )}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {moment(selectedData.createdAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </p>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">New Update</h2>
                  {!editMode && (
                    <input
                      type="text"
                      name="text"
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  )}
                  <button
                    onClick={handleNewChat}
                    className="w-full mt-4 p-2 border-2 cursor-pointer rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LeadModal;
