import React, { useEffect, useState } from "react";
import {  tab4 } from "../../constant";
import InputText from "../../component/InputText";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo, updateCompanyInfo } from "../../store/business";
import { useParams } from "react-router-dom";
import UploadFile from "../../component/aws/UploadFile";

const LicenceEdit = () => {
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
  } = useForm({ defaultValues: businessDataInfo?.licenceInfo });

  console.log("infoBus?.licenceInfo");
  console.log(infoBus?.licenceInfo);

  const [editModeLisence, setEditModeLisence] = useState(false);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    setInfoBus(businessDataInfo);
  }, [businessDataInfo]);

  const handleEditLicence = () => {
    setEditModeLisence(true);
  };

  const downloadLience = businessDataInfo?.licenceInfo?.uploadLience;

  const [license, setLicense] = useState(downloadLience);

  const [downloadLinks, setDownloadLinks] = useState({});

  useEffect(() => {
    console.log("downloadLinks from edit");
    console.log(downloadLinks?.uploadPassport?.uploadPassport);
  }, [downloadLinks]);

  useEffect(() => {
    if (downloadLinks.uploadLience) {
      setLicense(downloadLinks.uploadLience.uploadLience);
    }
  }, [downloadLinks]);

  const handleSaveLicence = () => {
    const values = getValues();

    setValue("licenceInfo", values);
    const licenceInfo = {
      misaLience: values.misaLience,
      misaLienceissue: values.misaLienceissue,
      misaLienceexpiry: values.misaLienceexpiry,
      uploadLience: license,
    };

    console.log("licenceInfo");
    console.log(licenceInfo);

    dispatch(
      updateCompanyInfo({
        companyId: businessDataInfo._id,
        data: {
          licenceInfo: licenceInfo,
          licence: true,
        },
      })
    );
    setEditModeLisence(false);
  };

  const handleDownload = (downloadLink) => {
    window.open(downloadLink, "_blank");
  };

  return (
    <div>
      {!editModeLisence && (
        <button className="float-right" onClick={handleEditLicence}>
          Edit
        </button>
      )}

      {editModeLisence && (
        <form onClick={handleSubmit(handleSaveLicence)}>
          <button className="float-right" type="submit">
            Save
          </button>
        </form>
      )}
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Licence Information</h1>
        <div className="grid grid-cols-4 w-full md:gap-6">
          {tab4.map((tab, index) => (
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
                // defaultValue={businessDataInfo?.licenceInfo[tab.name]}
                disabled={!editModeLisence}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-6">
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-5 group">
            {editModeLisence ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadLience: link,
                  }))
                }
                name={"uploadLience"}
                label={"Upload Lience"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Licence</h1>
                {license ? (
                  <button
                    onClick={() => handleDownload(downloadLience)}
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

export default LicenceEdit;
