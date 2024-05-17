import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLead } from "../store/lead";
import { truncate } from "lodash";
import moment from "moment";
import { CircleCheck } from "lucide-react";

const AllLead = ({ handleOpenLead, updateData  }) => {
  const dispatch = useDispatch();

  const leadAllData = useSelector((state) => state.appLead.leadAllData);

  console.log("leadAllData");
  console.log(leadAllData);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;
  const username = userData.name;

  useEffect(() => {
    dispatch(getAllLead({ role, username }));
  }, [updateData]);

  return (
    <div>
      <div className="flex flex-wrap gap-9">
        {leadAllData &&
          leadAllData.map((tab, index) => (
            <div className="w-[30%] rounded-xl border-2">
              {tab.status === 5 && (
                <CircleCheck
                  fill="green"
                  color="white"
                  size={32}
                  className="relative float-right p-1"
                />
              )}
              <div
                key={index} // Use a unique key for each item
                className="p-6  flex cursor-pointer justify-between"
                onClick={() => handleOpenLead(tab)}
              >
                <div className="flex w-[300px] flex-col gap-1">
                  <h1 className="text-lg font-semibold">{tab.customerName}</h1>
                  <p>{truncate(tab.purpose, { length: 100 })}</p>
                  {/* Truncate the text */}
                </div>
                <div className="flex text-sm flex-col ">
                  <p>{moment(tab.createdAt).format("MMMM Do YY")}</p>
                  <p>{moment(tab.createdAt).format("h:mm:ss a")}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllLead;
