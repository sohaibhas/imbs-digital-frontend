import React, { useEffect, useState } from "react";
import InputText from "./InputText";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { tab1 } from "../constant";
import ToggleButton from "./ToogleButton";
import UploadFile from "./aws/UploadFile";

const TabOne = ({
  register,
  errors,
  downloadLinks,
  setDownloadLinks,
  personalCompleted,
  setPersonalCompleted,
}) => {
  return (
    <div className="px-20">
      <form>
        <div className="flex justify-between gap-14 w-full">
          <div>
            <div className="grid grid-cols-2 w-full md:gap-6">
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
                      uploadPassport: link,
                    }))
                  }
                  name={"uploadPassport"}
                  label={"Upload Passport"}
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
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
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative z-0 w-full mb-5 group">
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
              </div>
              <div className="relative z-0 w-full mb-5 group">
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
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadother: link,
                  }))
                }
                name={"uploadother"}
                label={"Upload Other"}
              />
            </div>
          </div>
          <div className="float-right">
            <ToggleButton
              title={"Completed"}
              toogleName={"complete"}
              register={register}
              errors={errors}
              personalCompleted={personalCompleted}
              setPersonalCompleted={setPersonalCompleted}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabOne;
