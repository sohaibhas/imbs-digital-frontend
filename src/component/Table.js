import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompany,
  getBusinessInfo,
  getCompanyInfo,
} from "../store/business";
import { deleteUser, getUserInfo } from "../store/user";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import UpdateUser from "../pages/user/updateUser";

const Table = ({ companyInfo, userlist, CompanyTableDataHeader }) => {
  const [isOpenMap, setIsOpenMap] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.appBusiness.companyData);

  useEffect(() => {
    dispatch(getCompanyInfo())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        console.error("Error loading company info:", error);
      });
  }, [dispatch]);

  const handleDelete = (deleteId) => {
    const businessDataInfo = companyData.find(
      (data) => data.businessInfo?._id === deleteId
    );
    dispatch(deleteCompany(businessDataInfo._id));
    dispatch(getBusinessInfo());
  };

  const handleDeleteUser = (userId) => {
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const parentID = userData._id;

    if (userId === parentID) {
      toast.error("You Cannot Delete Yourself");
      return;
    }
    dispatch(deleteUser(userId))
      .then(() => {
        dispatch(getUserInfo());
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const toggleDropdown = (index) => {
    setIsOpenMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleUpdateUser = (userId) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  };

  const handleUserUpdate = (updatedUser) => {
    // Handle the updated user data (e.g., refresh the user list)
    console.log("User updated:", updatedUser);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      {isLoading ? ( // Show loading indicator if data is loading
        <div className="">
          <Spinner />
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {CompanyTableDataHeader?.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          {companyInfo && (
            <tbody>
              {companyInfo?.map((data, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.businessInfo.companyNameEnglish}
                  </th>
                  <td className="px-6 py-4">
                    {data.firstname} {data.lastname}
                  </td>
                  <td className="px-6 py-4">{data.businessInfo.email}</td>
                  <td className="px-6 py-4">
                    {data.phoneNumberKsa}
                  </td>
                  <td className="px-6 py-4">{data.trackingNumber}</td>
                  <td className="px-6 py-4">23/9/2030</td>
                  <td className="px-6 py-4">{data.status}</td>
                  <td className="px-6 py-4">
                    <a
                      href="/"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      20/10/2024
                    </a>
                  </td>
                  <td className="px-6 py-4 cursor-pointer">
                    <span onClick={() => toggleDropdown(index)}>
                      <EllipsisVertical />
                      <DropDown
                        EditComp={`/editbusiness/${data.businessInfo._id}`}
                        handleDelete={() => handleDelete(data.businessInfo._id)}
                        isOpen={isOpenMap[index]}
                        setIsOpen={(isOpen) =>
                          setIsOpenMap((prev) => ({ ...prev, [index]: isOpen }))
                        }
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {userlist && (
            <tbody>
              {userlist?.map((data, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.name}
                  </th>
                  <td className="px-6 py-4">{data?.email}</td>
                  <td className="px-6 py-4">{data?.role}</td>
                  <td className="px-6 py-4">{data?.phoneNumber}</td>
                  <td className="px-6 py-4 cursor-pointer">
                    <span onClick={() => toggleDropdown(index)}>
                      <EllipsisVertical />
                      <DropDown
                        updateUser={() => handleUpdateUser(data._id)}
                        handleDelete={() => handleDeleteUser(data._id)}
                        isOpen={isOpenMap[index]}
                        setIsOpen={(isOpen) =>
                          setIsOpenMap((prev) => ({ ...prev, [index]: isOpen }))
                        }
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
      {isModalOpen && (
        <UpdateUser
          userId={selectedUserId}
          onClose={handleCloseModal}
          onUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default Table;
