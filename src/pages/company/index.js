import React, { useEffect, useState } from "react";
import Table from "../../component/Table";
import ContractGenerator from "../contract";
import Button from "../../component/Button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessInfo, getPersonalInfo } from "../../store/business";
import TableTop from "../../component/TableTop";
import { CompanyTableDataHeader } from "../../constant";
import UploadFile from "../../component/aws/UploadFile";
import WinLead from "../../component/WinLead";
import axios from "axios";

const Company = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const businessInfo = useSelector((state) => state.appBusiness.businessInfo);
  const uploadData = useSelector((state) => state.appBusiness.uploadData);

  const [companyInfo, setCompanyInfo] = useState();

  useEffect(() => {
    dispatch(getBusinessInfo());
    dispatch(getPersonalInfo());
  }, [dispatch]);

  useEffect(() => {
    setCompanyInfo(businessInfo);
  }, [businessInfo]);

  useEffect(() => {
    console.log("companyInfo");
    console.log(companyInfo);
  }, [businessInfo]);

  const handleExportExcel = async () => {
    try {
      // Make a GET request to the /business/excel endpoint
      const response = await axios.get("http://localhost:5000/api/company/business/excel", {
        responseType: "blob", // Set the response type to blob
      });

      // Create a temporary URL for the Blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "business-info.xlsx";
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div>
      <div className="p-6">
        <button onClick={handleExportExcel}>Export to Excel</button>
        <div className="p-6 gap-3 flex items-end justify-end">
          <Link to="/addnewbusiness">
            <Button
              variant="primary"
              title="Add Business"
              icon={<Plus size={16} />}
            />
          </Link>
        </div>
        <div>
          <TableTop />
          <Table
            CompanyTableDataHeader={CompanyTableDataHeader}
            companyInfo={companyInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Company;
