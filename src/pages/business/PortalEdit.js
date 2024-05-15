import React, { useEffect, useState } from "react";
import { tab1, tab2, tab3, tab4, tab5, tab5_1, tab5_2 } from "../../constant";
import InputText from "../../component/InputText";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo, updateCompanyInfo } from "../../store/business";
import { useParams } from "react-router-dom";
import UploadFile from "../../component/aws/UploadFile";
import { ToastContainer } from "react-toastify";

const PortalEdit = () => {
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
  } = useForm({ defaultValues: businessDataInfo?.portalInfo });

  console.log("infoBus?.portalInfo");
  console.log(infoBus?.portalInfo);

  const [editModePortal, setEditModePortal] = useState(false);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    setInfoBus(businessDataInfo);
  }, [businessDataInfo]);

  const handleEditPortal = () => {
    setEditModePortal(true);
  };

  const downloadVat = businessDataInfo?.portalInfo?.uploadVat;
  const downloadZakat = businessDataInfo?.portalInfo?.uploadZakat;

  const [vat, setVat] = useState(downloadVat);
  const [zakat, setZakat] = useState(downloadZakat);

  const [downloadLinks, setDownloadLinks] = useState({});

  useEffect(() => {
    console.log("downloadLinks from edit");
    console.log(downloadLinks?.uploadPassport?.uploadPassport);
  }, [downloadLinks]);

  useEffect(() => {
    if (downloadLinks.uploadZakat) {
      setZakat(downloadLinks.uploadZakat.uploadZakat);
    }
    if (downloadLinks.uploadVat) {
      setVat(downloadLinks.uploadVat.uploadVat);
    }
  }, [downloadLinks]);

  const handleSavePortal = () => {
    const values = getValues();

    setValue("portalInfo", values);
    const portalInfo = {
      tin: values.tin,
      zactaUser: values.zactaUser,
      Zactapassword: values.Zactapassword,
      qiwaUser: values.qiwaUser,
      qiwaPassword: values.qiwaPassword,
      muqeemNumber: values.muqeemNumber,
      muqeemEmail: values.muqeemEmail,
      muqeemPassword: values.muqeemPassword,
      uploadVat: vat,
      uploadZakat: zakat,
    };

    console.log("portalInfo");
    console.log(portalInfo);

    dispatch(
      updateCompanyInfo({
        companyId: businessDataInfo._id,
        data: {
          portalInfo: portalInfo,
          portals: true,
        },
      })
    );
    setEditModePortal(false);
  };

  const handleDownload = (downloadLink) => {
    window.open(downloadLink, "_blank");
  };

  return (
    <div>
      {!editModePortal && (
        <button className="float-right" onClick={handleEditPortal}>
          Edit
        </button>
      )}

      {editModePortal && (
        <form onClick={handleSubmit(handleSavePortal)}>
          <button className="float-right" type="submit">
            Save
          </button>
        </form>
      )}
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Other Portal Information</h1>
        <div className="grid grid-cols-4 w-full md:gap-6">
          {tab5.map((tab, index) => (
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
                // defaultValue={businessDataInfo?.portalInfo[tab.name]}
                disabled={!editModePortal}
              />
            </div>
          ))}
          {tab5_1.map((tab, index) => (
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
                // defaultValue={businessDataInfo?.portalInfo[tab.name]}
                disabled={!editModePortal}
              />
            </div>
          ))}
          {tab5_2.map((tab, index) => (
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
                // defaultValue={businessDataInfo?.portalInfo[tab.name]}
                disabled={!editModePortal}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-6">
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-5 group">
            {editModePortal ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadVat: link,
                  }))
                }
                name={"uploadVat"}
                label={"Upload Vat"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Vat</h1>
                {vat ? (
                  <button
                    onClick={() => handleDownload(downloadVat)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    View
                  </button>
                ) : (
                  <h1>File Not Found</h1>
                )}
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {editModePortal ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadZakat: link,
                  }))
                }
                name={"uploadZakat"}
                label={"Upload Zakat"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Zakat</h1>
                {zakat ? (
                  <button
                    onClick={() => handleDownload(downloadZakat)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    View
                  </button>
                ) : (
                  <h1>File Not Found</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalEdit;
