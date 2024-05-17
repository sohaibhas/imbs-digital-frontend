import React, { useEffect, useState } from "react";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../store/lead";
import LeadModal from "../../component/LeadModal";
import LeadCommon from "../../component/Lead";
import AllLead from "../../component/AllLead";
import Spinner from "../../component/Spinner";

const Lead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFresh, setLoadingFresh] = useState(false);
  const dispatch = useDispatch();
  const leadData = useSelector((state) => state.appLead.leadData);

  const [freshData, setFreshData] = useState(false);

  console.log("leadData");
  console.log(leadData);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;
  const username = userData.name;

  const [selectedOption, setSelectedOption] = useState("today");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true when fetching data
    setLoadingFresh(true);
    dispatch(getLead({ date: selectedOption, role, username }))
      .then(() => setLoadingFresh(false)) // Set loading state to false after data is fetched
      .catch(() => setLoadingFresh(false)); // Set loading state to false on error
  }, [selectedOption]); // Fetch data when selectedOption changes

  const handleClose = () => {
    setIsOpen(false);
    setLoading(true); // Set loading state to true before fetching data
    dispatch(getLead({ date: selectedOption, role, username })).then(() =>
      setLoading(false)
    ); // Set loading state to false after data is fetched
  };

  const handleModal = () => {
    setIsOpen(true);
  };
  const [openLead, setOpenLead] = useState(false);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    setLoading(true);
    setFreshData(true);
    dispatch(getLead({ date: selectedOption, role, username })).then(() => {
      setFreshData(false);
      setLoading(false);
    });
  }, [selectedOption, openLead, selectedData]);

  const handleOpenLead = (currentData) => {
    setOpenLead(true);
    setSelectedData(currentData);
  };

  const updateData = () => {
    setLoading(true); // Set loading state to true before dispatching action
    dispatch(getLead({ date: selectedOption, role, username }))
      .then(() => setLoading(false)) // Set loading state to false after action is completed
      .catch(() => setLoading(false)); // Set loading state to false on error
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
        {loading || loadingFresh ? (
          <Spinner />
        ) : (
          <LeadCommon leadData={leadData} handleOpenLead={handleOpenLead} />
        )}
        <h1 className="text-lg font-medium">All Leads</h1>
        {loading ? (
          <Spinner />
        ) : (
          <AllLead
            freshData={freshData}
            handleOpenLead={handleOpenLead}
            updateData={updateData}
          />
        )}
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
