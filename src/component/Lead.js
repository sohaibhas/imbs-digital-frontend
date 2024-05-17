import { truncate } from "lodash";
import { CircleCheck } from "lucide-react";
import moment from "moment";
import React from "react";

const LeadCommon = ({ leadData, handleOpenLead }) => {
  return (
    <div>
      <div className="flex md:flex-row flex-col flex-wrap gap-9">
        {leadData &&
          leadData.map((tab, index) => (
            <div className="md:w-[30%] rounded-xl border-2">
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
                className="p-6  flex md:flex-row flex-col cursor-pointer justify-between"
                onClick={() => handleOpenLead(tab)}
              >
                <div className="flex md:w-[300px] flex-col gap-1">
                  <h1 className="text-lg font-semibold">{tab.customerName}</h1>
                  <p>{truncate(tab.purpose, { length: 100 })}</p>
                  {/* Truncate the text */}
                </div>
                <div className="flex text-sm flex-col ">
                  <p>{moment(tab.createdAt).format("MMMM Do YY")}</p>
                  <p>{moment(tab.createdAt).format("h:mm:ss a")}</p>
                </div>
              </div>
              <div className="float-right p-2">Role:{tab.role}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeadCommon;
