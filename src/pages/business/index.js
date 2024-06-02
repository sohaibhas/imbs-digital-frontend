import React, { useEffect, useState } from "react";
import { tab1, tab2, tab3, tab4, tab5, tab5_1, tab5_2 } from "../../constant";
import InputText from "../../component/InputText";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo, updateCompanyInfo } from "../../store/business";
import { useParams } from "react-router-dom";
import UploadFile from "../../component/aws/UploadFile";
import { ToastContainer } from "react-toastify";
import CompanyEdit from "./CompanyEdit";
import ParentEdit from "./ParentEdit";
import LicenceEdit from "./LicenceEdit";
import PortalEdit from "./PortalEdit";

const Business = () => {
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
  } = useForm({ defaultValues: businessDataInfo?.personalInfo });

  console.log("infoBus?.personalInfo");
  console.log(infoBus?.personalInfo);

  const [editModePersonal, setEditModePersonal] = useState(false);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    setInfoBus(businessDataInfo);
  }, [businessDataInfo]);

  const handleEditPersonal = () => {
    setEditModePersonal(true);
  };

  const downloadPassport = businessDataInfo?.personalInfo?.uploadPassport;
  const uploadIdCard = businessDataInfo?.personalInfo?.uploadIdCard;
  const uploadIqamaId = businessDataInfo?.personalInfo?.uploadIqamaId;
  const uploadPicture = businessDataInfo?.personalInfo?.uploadPicture;

  const [passport, setPassport] = useState(downloadPassport);
  const [idCard, setIdCard] = useState(uploadIdCard);
  const [idIqama, setIdIqama] = useState(uploadIqamaId);
  const [picture, setPicture] = useState(uploadPicture);

  const [downloadLinks, setDownloadLinks] = useState({});

  useEffect(() => {
    console.log("downloadLinks from edit");
    console.log(downloadLinks?.uploadPassport?.uploadPassport);
  }, [downloadLinks]);

  useEffect(() => {
    if (downloadLinks.uploadPassport) {
      setPassport(downloadLinks.uploadPassport.uploadPassport);
    }
    if (downloadLinks.uploadidcard) {
      setIdCard(downloadLinks.uploadidcard.uploadidcard);
    }
    if (downloadLinks.uploadiqamaid) {
      setIdIqama(downloadLinks.uploadiqamaid.uploadiqamaid);
    }
    if (downloadLinks.uploadPicture) {
      setPicture(downloadLinks.uploadPicture.uploadPicture);
    }
  }, [downloadLinks]);

  const handleSavePersonal = () => {
    const values = getValues();

    setValue("personalInfo", values);
    const personalUpdatedData = {
      firstname: values.firstname,
      lastname: values.lastname,
      phoneNumberKsa: values.phoneNumberKsa,
      homeCountryNumber: values.homeCountryNumber,
      passportNumber: values.passportNumber,
      idCardNumber: values.idCardNumber,
      iqamaNumber: values.iqamaNumber,
      dateOfBirth: values.dateOfBirth,
      personCountry: values.personCountry,
      uploadIdCard: idCard,
      uploadIqamaId: idIqama,
      uploadPicture: picture,
      uploadPassport: passport,
    };

    console.log("personalUpdatedData");
    console.log(personalUpdatedData);
    dispatch(
      updateCompanyInfo({
        companyId: businessDataInfo._id,
        data: {
          personalInfo: personalUpdatedData,
        },
      })
    );
    dispatch(getCompanyInfo());
    setEditModePersonal(false);
  };

  const handleDownload = (downloadLink) => {
    window.open(downloadLink, "_blank");
  };

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const role = userData?.role;

  return (
    <div className="p-16">
      <ToastContainer />
      {role !== "pak" && (
        <>
          {!editModePersonal && (
            <button className="float-right" onClick={handleEditPersonal}>
              Edit
            </button>
          )}
        </>
      )}
      {editModePersonal && (
        <button className="float-right" onClick={handleSavePersonal}>
          Save
        </button>
      )}
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Personal Information</h1>
        <div className="grid grid-cols-4 w-full md:gap-6">
          {tab1.map((tab, index) => (
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
                disabled={!editModePersonal}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-6">
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-5 group">
            {editModePersonal ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadPassport: link,
                  }))
                }
                name={"uploadPassport"}
                label={"Upload Passport"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Passport</h1>
                {passport ? (
                  <button
                    onClick={() => handleDownload(downloadPassport)}
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
          <div className="relative z-0 w-full mb-5 group">
            {editModePersonal ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadidcard: link,
                  }))
                }
                name={"uploadidcard"}
                label={"Upload Id Card"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>ID Card</h1>
                {idCard ? (
                  <button
                    onClick={() => handleDownload(uploadIdCard)}
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
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-5 group">
            {editModePersonal ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadiqamaid: link,
                  }))
                }
                name={"uploadiqamaid"}
                label={"Upload Iqama Id"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Iqama ID</h1>
                {idIqama ? (
                  <button
                    onClick={() => handleDownload(uploadIqamaId)}
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
          <div className="relative z-0 w-full mb-5 group">
            {editModePersonal ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadPicture: link,
                  }))
                }
                name={"uploadPicture"}
                label={"Upload Picture"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Picture</h1>
                {picture ? (
                  <button
                    onClick={() => handleDownload(uploadPicture)}
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
        <div className="relative z-0 w-full mb-5 group"></div>
      </div>
      <CompanyEdit />
      <ParentEdit />
      {role !== "pak" && (
        <>
          <LicenceEdit />
          <PortalEdit />{" "}
        </>
      )}
    </div>
  );
};

export default Business;
