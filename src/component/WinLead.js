import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWinnerLead } from "../store/lead";
import { truncate } from "lodash";
import moment from "moment";

const WinLead = () => {
  const dispatch = useDispatch();
  const leadWinData = useSelector((state) => state.appLead.leadWinData);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;
  const username = userData.name;

  useEffect(() => {
    dispatch(getWinnerLead({ role, username }));
  }, []);

  return (
    <div className="container">
      <div className="flex flex-wrap gap-9">
        {leadWinData && leadWinData.length > 0 ? (
          leadWinData.map((tab) => {
            const createdAtMoment = moment(tab.createdAt);
            return (
              <div
                key={tab.id}
                className="p-6 pb-0 rounded-xl border-2 cursor-pointer flex flex-col md:flex-row md:w-[30%] lead-item"
              >
                <div className="flex-grow flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{tab.customerName}</h1>
                  <p>{truncate(tab.purpose, { length: 100 })}</p>
                  <div className="text-[12px] font-bold p-1 mt-auto">
                    {tab.username}
                  </div>
                </div>
                <div className="flex-shrink-0 text-sm text-right md:text-left">
                  <p>{createdAtMoment.format("MMMM Do YY")}</p>
                  <p>{createdAtMoment.format("h:mm:ss a")}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No winning leads found</p>
        )}
      </div>
    </div>
  );
};

export default WinLead;
