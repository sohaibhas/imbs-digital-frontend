import { truncate } from "lodash";
import { CircleCheck } from "lucide-react";
import moment from "moment";
import React from "react";

const LeadCommon = ({ leadData, handleOpenLead }) => {
  return (
    <div className="container px-4">
      <div className="flex flex-wrap gap-9">
        {leadData &&
          leadData.map((tab, index) => (
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

export default LeadCommon;
