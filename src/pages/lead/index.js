import React, { useEffect, useState } from "react";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../store/lead";
import LeadModal from "../../component/LeadModal";
import LeadCommon from "../../component/Lead";
import AllLead from "../../component/AllLead";

const Lead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const leadData = useSelector((state) => state.appLead.leadData);

  console.log("leadData");
  console.log(leadData);

  // console.log("leadData");
  // console.log(leadData);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;
  const username = userData.name;

  // const [newData, setNewData] = useState();

  // useEffect(() => {
  //   if (role === "admin") {
  //     setNewData(leadData);
  //   } else if (role === "user") {
  //     const filteredData = leadData.filter(
  //       (dat) => dat.role === "user" && dat.username === username
  //     );
  //     setNewData(filteredData);
  //   }
  // }, [role, leadData, userData]);

  // console.log("newData");
  // console.log(newData);

  const [selectedOption, setSelectedOption] = useState("today");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    dispatch(getLead({ date: selectedOption, role, username }));
  }, [selectedOption]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(true);
  };

  const [openLead, setOpenLead] = useState(false);

  const [selectedData, setSelectedData] = useState();

  const handleOpenLead = (currentData) => {
    setOpenLead(true);
    setSelectedData(currentData);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex px-10 p-6 flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Add New Lead</h1>
          <div>
            <Button
              onClick={handleModal}
              variant={"primary"}
              title={"Add New Lead"}
            />
          </div>
        </div>
        <div>
          <select
            id="dropdownRadioButton"
            value={selectedOption}
            onChange={handleSelectChange}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last-7-days">Last 7 Days</option>
          </select>
        </div>
        <LeadCommon leadData={leadData} handleOpenLead={handleOpenLead} />
        <h1 className="text-lg font-medium">All Leads</h1>
        <AllLead handleOpenLead={handleOpenLead} />
      </div>
      <Modal isOpen={isOpen} handleClose={handleClose} />
      <LeadModal
        selectedData={selectedData}
        openLead={openLead}
        setOpenLead={setOpenLead}
      />
    </div>
  );
};

export default Lead;
