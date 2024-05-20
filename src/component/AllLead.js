import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLead } from "../store/lead";
import { truncate } from "lodash";
import moment from "moment";
import { CircleCheck } from "lucide-react";

const AllLead = ({ handleOpenLead, updateData }) => {
  const dispatch = useDispatch();
  const leadAllData = useSelector((state) => state.appLead.leadAllData);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;
  const username = userData.name;

  useEffect(() => {
    dispatch(getAllLead({ role, username }));
  }, [dispatch, role, username, updateData]);

  return (
    <div className="container px-4">
      <div className="flex flex-wrap gap-9">
        {leadAllData &&
          leadAllData.map((tab, index) => (
            <div
              key={index} // Use a unique key for each item
              className="md:w-[30%] rounded-xl border-2 p-4 relative"
              onClick={() => handleOpenLead(tab)}
            >
              {tab.status === 5 && (
                <CircleCheck
                  fill="green"
                  color="white"
                  size={32}
                  className="absolute top-2 right-2"
                />
              )}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-semibold">
                      {tab.customerName}
                    </h1>
                    <p>{truncate(tab.purpose, { length: 100 })}</p>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm text-right">
                    <p>{moment(tab.createdAt).format("MMMM Do YY")}</p>
                    <p>{moment(tab.createdAt).format("h:mm:ss a")}</p>
                  </div>
                  <div className="text-[12px] font-bold p-1">
                    Role: {tab.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllLead;
