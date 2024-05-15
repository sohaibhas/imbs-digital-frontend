import React, { useEffect, useState } from "react";
import { tab1, tab2, tab3, tab4, tab5, tab5_1, tab5_2 } from "../../constant";
import InputText from "../../component/InputText";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo, updateCompanyInfo } from "../../store/business";
import { useParams } from "react-router-dom";
import UploadFile from "../../component/aws/UploadFile";
import { ToastContainer } from "react-toastify";

const ParentEdit = () => {
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
  } = useForm({ defaultValues: businessDataInfo?.parentCompany });

  const [editModeParent, setEditModeParent] = useState(false);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    setInfoBus(businessDataInfo);
  }, [businessDataInfo]);

  const handleEditParent = () => {
    setEditModeParent(true);
  };

  const [downloadLinks, setDownloadLinks] = useState({});

  const downloadAudit = businessDataInfo?.parentCompany?.uploadAudit;
  const downloadMemorandom = businessDataInfo?.parentCompany?.uploadMemorandum;
  const downloadRegistration =
    businessDataInfo?.parentCompany?.uploadRegistration;

  const [audit, setAudit] = useState(downloadAudit);
  const [memorandom, setMemorandom] = useState(downloadMemorandom);
  const [registeration, setRegisteration] = useState(downloadRegistration);

  useEffect(() => {
    console.log("downloadLinks from edit");
    console.log(downloadLinks?.uploadMemorandum?.uploadMemorandum);
  }, [downloadLinks]);

  useEffect(() => {
    if (downloadLinks.uploadAudit) {
      setAudit(downloadLinks.uploadAudit.uploadAudit);
    }
    if (downloadLinks.uploadMemorandum) {
      setMemorandom(downloadLinks.uploadMemorandum.uploadMemorandum);
    }
    if (downloadLinks.uploadRegistration) {
      setRegisteration(downloadLinks.uploadRegistration.uploadRegistration);
    }
  }, [downloadLinks]);

  const handleSaveParent = () => {
    const values = getValues();

    setValue("parentCompany", values);
    const parentCompany = {
      arabicName: values.arabicName,
      englishName: values.englishName,
      expiryDate: values.expiryDate,
      issueDate: values.issueDate,
      registrationNumber: values.registrationNumber,
      uploadRegistration: registeration,
      uploadMemorandum: memorandom,
      uploadAudit: audit,
    };

    dispatch(
      updateCompanyInfo({
        companyId: businessDataInfo._id,
        data: {
          parentCompany: parentCompany,
          parent: true,
        },
      })
    );
    setEditModeParent(false);
  };

  const handleDownload = (downloadLink) => {
    window.open(downloadLink, "_blank");
  };

  return (
    <div>
      {!editModeParent && (
        <button className="float-right" onClick={handleEditParent}>
          Edit
        </button>
      )}

      {editModeParent && (
        <form onClick={handleSubmit(handleSaveParent)}>
          <button className="float-right" type="submit">
            Save
          </button>
        </form>
      )}
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Parent Company Information</h1>
        <div className="grid grid-cols-4 w-full md:gap-6">
          {tab3.map((tab, index) => (
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
                // defaultValue={businessDataInfo?.parentCompany[tab.name]}
                disabled={!editModeParent}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-6">
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-5 group">
            {editModeParent ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadAudit: link,
                  }))
                }
                name={"uploadAudit"}
                label={"Upload Audit"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Audit</h1>
                {audit ? (
                  <button
                    onClick={() => handleDownload(downloadAudit)}
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
            {editModeParent ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadRegistration: link,
                  }))
                }
                name={"uploadRegistration"}
                label={"Upload Registration"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Registration</h1>
                {registeration ? (
                  <button
                    onClick={() => handleDownload(downloadRegistration)}
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
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-5 group">
            {editModeParent ? (
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadMemorandum: link,
                  }))
                }
                name={"uploadMemorandum"}
                label={"Upload Memorandum"}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <h1>Memorandom</h1>
                {memorandom ? (
                  <button
                    onClick={() => handleDownload(downloadMemorandom)}
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

export default ParentEdit;
