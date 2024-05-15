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
    <div>
      <div className="flex flex-wrap gap-9">
        {leadWinData &&
          leadWinData.map((tab) => {
            const createdAtMoment = moment(tab.createdAt);
            return (
              <div
                key={tab.id}
                className="p-6 rounded-xl border-2 flex cursor-pointer justify-between w-[30%] lead-item"
              >
                <div className="flex w-[300px] flex-col gap-1">
                  <h1 className="text-lg font-semibold">{tab.customerName}</h1>
                  <p>{truncate(tab.purpose, { length: 100 })}</p>
                </div>
                <div className="flex text-sm flex-col">
                  <p>{createdAtMoment.format("MMMM Do YY")}</p>
                  <p>{createdAtMoment.format("h:mm:ss a")}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WinLead;
