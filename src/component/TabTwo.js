import React from "react";
import InputText from "./InputText";
import { tab2 } from "../constant";
import ToggleButton from "./ToogleButton";
import UploadFile from "./aws/UploadFile";

const TabTwo = ({
  register,
  errors,
  downloadLinks,
  setDownloadLinks,
  personalCompleted,
  setPersonalCompleted,
}) => {
  return (
    <div className="px-28">
      <form>
        <div className="flex justify-between gap-14 w-full">
          <div>
            <div className="grid grid-cols-2 md:gap-6">
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
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <UploadFile
                setDownloadLink={(link) =>
                  setDownloadLinks((prevLinks) => ({
                    ...prevLinks,
                    uploadcustomeragreement: link,
                  }))
                }
                name={"uploadcustomeragreement"}
                label={"Upload Customer Agreement"}
              />
            </div>
          </div>
          <div className="float-right">
            <ToggleButton
              title={"Completed"}
              toogleName={"businesscomplete"}
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

export default TabTwo;
