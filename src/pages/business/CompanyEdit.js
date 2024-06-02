import React, { useEffect, useState } from "react";
import { tab1, tab2, tab3, tab4, tab5, tab5_1, tab5_2 } from "../../constant";
import InputText from "../../component/InputText";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo, updateCompanyInfo } from "../../store/business";
import { useParams } from "react-router-dom";
import UploadFile from "../../component/aws/UploadFile";
import { ToastContainer } from "react-toastify";

const CompanyEdit = () => {
  const [infoBus, setInfoBus] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const companyData = useSelector((state) => state.appBusiness.companyData);

  const businessDataInfo = companyData.find(
    (data) => data.businessInfo?._id === id
  );

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues: businessDataInfo?.businessInfo });

  console.log("infoBus?.businessInfo");
  console.log(infoBus?.businessInfo);

  const [downloadLinks, setDownloadLinks] = useState({});

  const [editModeCompany, setEditModeCompany] = useState(false);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    setInfoBus(businessDataInfo);
  }, [businessDataInfo]);

  const handleEditBusiness = () => {
    setEditModeCompany(true);
  };

  const downloadAggrement = businessDataInfo?.businessInfo?.uploadAgreement;

  const [aggrement, setAggrement] = useState(downloadAggrement);

  useEffect(() => {
    console.log("downloadLinks from edit");
    console.log(downloadLinks?.uploadAgreement?.uploadAgreement);
  }, [downloadLinks]);

  useEffect(() => {
    if (downloadLinks.uploadAgreement) {
      setAggrement(downloadLinks.uploadAgreement.uploadAgreement);
    }
  }, [downloadLinks]);

  const handleSaveBusiness = () => {
    const values = getValues();

    setValue("businessInfo", values);
    const businessUpdatedData = {
      companyNameEnglish: values.companyNameEnglish,
      companyNameArabic: values.companyNameArabic,
      businessPurpose: values.businessPurpose,
      licenseType: values.licenseType,
      sector: values.sector,
      country: values.country,
      email: values.email,
      uploadAgreement: aggrement,
    };

    console.log("businessUpdatedData");
    console.log(businessUpdatedData);

    dispatch(
      updateCompanyInfo({
        companyId: businessDataInfo._id,
        data: {
          businessInfo: businessUpdatedData,
        },
      })
    );
    setEditModeCompany(false);
  };

  const handleDownload = (downloadLink) => {
    window.open(downloadLink, "_blank");
  };

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData?.role;

  return (
    <div>
      {role !== "pak" && (
        <>
          {!editModeCompany && (
            <button className="float-right" onClick={handleEditBusiness}>
              Edit
            </button>
          )}
        </>
      )}

      {editModeCompany && (
        <form onClick={handleSubmit(handleSaveBusiness)}>
          <button className="float-right" type="submit">
            Save
          </button>
        </form>
      )}
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Business Information</h1>
        <div className="grid grid-cols-4 w-full md:gap-6">
          {tab2.map((tab, index) => (
            <div className="relative w-full z-0 mb-5 group" key={index}>
              <InputText
                name={tab.name}
                type={tab.title}
                register={register}
                errors={errors}
                label={tab.label}
                variant={tab.variant}
                title={tab.title}
                placeholder={""}
                errorTitle={tab.errorTitle}
                // defaultValue={businessDataInfo?.businessInfo[tab.name]}
                disabled={!editModeCompany}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-6">
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-5 group">
            {editModeCompany ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadAgreement: link,
                  }))
                }
                name={"uploadAgreement"}
                label={"Upload Aggrement"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Aggrement</h1>
                {aggrement ? (
                  <button
                    onClick={() => handleDownload(downloadAggrement)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    View
                  </button>
                ) : (
                  <h1 className="not-found">File Not Found</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEdit;
