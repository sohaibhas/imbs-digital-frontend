import React from "react";
import InputText from "./InputText";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { tab3 } from "../constant";
import UploadFile from "./aws/UploadFile";

const TabThree = ({ register, errors, downloadLinks, setDownloadLinks }) => {
  
  const { handleSubmit } = useForm();

  const onSubmitTabThree = (data) => {
    console.log(data); // Optionally log the data
  };

  return (
    <div className="px-28">
      <form>
        <div className="flex justify-between gap-14 w-full">
          <div>
            <div className="grid grid-cols-2 md:gap-6">
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
                      uploadcompanyRegistration: link,
                    }))
                  }
                  name={"uploadcompanyRegistration"}
                  label={"Upload Company Registration"}
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <UploadFile
                  setDownloadLink={(link) =>
                    setDownloadLinks((prevLinks) => ({
                      ...prevLinks,
                      uploadmemorandom: link,
                    }))
                  }
                  name={"uploadmemorandom"}
                  label={"Upload Memorandum"}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative z-0 w-full mb-5 group">
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
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <UploadFile
                  setDownloadLink={(link) =>
                    setDownloadLinks((prevLinks) => ({
                      ...prevLinks,
                      uploadPowerof: link,
                    }))
                  }
                  name={"uploadPowerof"}
                  label={"Upload Power of Attorney"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabThree;
