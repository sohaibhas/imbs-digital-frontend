import React from "react";
import InputText from "./InputText";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { tab4 } from "../constant";
import UploadFile from "./aws/UploadFile";

const TabFour = ({ register, errors, handleSubmit, downloadLinks, setDownloadLinks  }) => {
  const onSubmit = (data) => {
    handleSubmit(data);
  };
  return (
    <div className="px-28">
      <form>
        <div className="flex justify-around gap-14 w-full">
          <div>
            <div className="grid grid-cols-2 md:gap-6">
              {tab4.map((tab, index) => (
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
                      uploadmisa: link,
                    }))
                  }
                  name={"uploadmisa"}
                  label={"Upload MISA licence"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabFour;
