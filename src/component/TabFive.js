import React from "react";
import InputText from "./InputText";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { tab1, tab5, tab5_1, tab5_2 } from "../constant";
import UploadFile from "./aws/UploadFile";

const TabFive = ({
  register,
  errors,
  handleSubmit,
  downloadLinks,
  setDownloadLinks,
}) => {
  const onSubmit = (data) => {
    handleSubmit(data);
  };

  return (
    <div className="px-28">
      <form>
        <div className="flex justify-around gap-14 w-full">
          <div>
            <h1 className="font-bold pb-4">ZACTA</h1>
            <div className="grid grid-cols-2 md:gap-6">
              {tab5.map((tab, index) => (
                <div className="relative w-full z-0 mb-5 group">
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
                  />
                </div>
              ))}
            </div>
            <h1 className="font-bold pb-4">Qiwa</h1>
            <div className="grid grid-cols-2 md:gap-6">
              {tab5_1.map((tab, index) => (
                <div className="relative w-full z-0 mb-5 group">
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
                  />
                </div>
              ))}
            </div>
            <h1 className="font-bold pb-4">Muqeem</h1>
            <div className="grid grid-cols-2 md:gap-6">
              {tab5_2.map((tab, index) => (
                <div className="relative w-full z-0 mb-5 group">
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
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:gap-6">
            <div className="flex gap-4">
              <div className="relative z-0 w-full mb-5 group">
                <UploadFile
                  setDownloadLink={(link) =>
                    setDownloadLinks((prevLinks) => ({
                      ...prevLinks,
                      uploadvat: link,
                    }))
                  }
                  name={"uploadvat"}
                  label={"Upload VAT"}
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <UploadFile
                  setDownloadLink={(link) =>
                    setDownloadLinks((prevLinks) => ({
                      ...prevLinks,
                      uploadzakat: link,
                    }))
                  }
                  name={"uploadzakat"}
                  label={"Upload Zakat"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabFive;
