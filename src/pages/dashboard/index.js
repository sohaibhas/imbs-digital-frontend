import React, { useEffect, useState } from "react";
import ContractGenerator from "../contract";
import Button from "../../component/Button";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessInfo, getPersonalInfo } from "../../store/business";
import WinLead from "../../component/WinLead";
import Spinner from "../../component/Spinner";

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  const businessInfo = useSelector((state) => state.appBusiness.businessInfo);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData.role;

  useEffect(() => {
    dispatch(getBusinessInfo())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        console.error("Error loading business info:", error);
      });
    dispatch(getPersonalInfo());
  }, [dispatch]);

  const completedCompanies = businessInfo?.filter(
    (company) => company.status === "Completed"
  );
  const inProgressCompanies = businessInfo?.filter(
    (company) => company.status === "In Progress"
  );

  return (
    <div>
      {isLoading ? ( // Show spinner if data is loading
        <div className="p-32">
          <Spinner />
        </div>
      ) : (
        <div className="p-6 px-10">
          <div className="p-6 gap-3 flex items-end justify-end">
            <Button
              variant="primary"
              title="Create Contract"
              onClick={() => setModalIsOpen(true)}
              icon={<Plus size={16} />}
            />
          </div>
          <h1 className="text-lg font-medium pb-3">Lead Converted</h1>
          <WinLead />
          {role === "admin" && (
            <>
              {" "}
              <h1 className="text-lg font-medium py-6"> Business List</h1>
              <div className="flex md:flex-row flex-col gap-20 h-44">
                <div>
                  <h1 className="p-2 text-lg font-semibold">In-Progress</h1>
                  <div className="max-h-96 overflow-auto">
                    <table className="border-2 max-h-10 rounded-xl">
                      <thead>
                        <tr>
                          <th className=" p-3 text-lg font-semibold">
                            Company Name
                          </th>
                          <th className=" p-3 text-lg font-semibold">
                            Tracking Number
                          </th>
                          <th className=" p-3 text-lg font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inProgressCompanies &&
                          inProgressCompanies.map((company, index) => (
                            <tr key={index}>
                              <td className=" p-3">
                                {company.businessInfo.companyNameEnglish}
                              </td>
                              <td className=" p-3">{company.trackingNumber}</td>
                              <td className=" p-3">{company.status}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h1 className="p-2 text-lg font-semibold">Completed</h1>
                  <div className="max-h-96 overflow-auto">
                    <table className="border-2 max-h-10 rounded-xl">
                      <thead>
                        <tr>
                          <th className="p-3 text-lg font-semibold">
                            Company Name
                          </th>
                          <th className="p-3 text-lg font-semibold">
                            Tracking Number
                          </th>
                          <th className="p-3 text-lg font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedCompanies &&
                          completedCompanies.map((company, index) => (
                            <tr key={index}>
                              <td className="p-3">
                                {company.businessInfo.companyNameEnglish}
                              </td>
                              <td className="p-3">{company.trackingNumber}</td>
                              <td className="p-3">{company.status}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <ContractGenerator
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default Dashboard;
