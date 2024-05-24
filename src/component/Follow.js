import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByFollowUp, getWinnerLead } from "../store/lead";
import { truncate } from "lodash";
import moment from "moment";

const Follow = () => {
  const dispatch = useDispatch();
  const followUp = useSelector((state) => state.appLead.followUp);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;
  const username = userData.name;

  useEffect(() => {
    dispatch(getByFollowUp({ role, username }));
  }, []);

  return (
    <div className="container px-4">
      <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-12">
        {followUp && followUp.length > 0 ? (
          followUp.map((tab) => {
            const formattedDate = moment(tab.followUpDate).format(
              "MMMM Do YYYY"
            );
            return (
              <div
                key={tab.id}
                className="p-6 pb-0 rounded-xl border-2 cursor-pointer flex flex-col md:flex-row md:w-[30%] lead-item"
              >
                <div className="flex-grow flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{tab.customerName}</h1>
                  <p>{truncate(tab.purpose, { length: 100 })}</p>
                  <div className="text-[12px] font-bold mt-auto">
                    {tab.username}
                  </div>
                </div>
                <div className="flex-shrink-0 text-[12px] font-bold text-right md:text-left">
                  Follow Up Date:
                  <p> {formattedDate}</p>
                  <p>{moment(tab.followUpDate).format("h:mm:ss a")}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No follow-up data available</p>
        )}
      </div>
    </div>
  );
};

export default Follow;
