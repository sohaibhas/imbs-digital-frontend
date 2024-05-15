import { CircleUser } from "lucide-react";
import React, { useEffect, useState } from "react";
import TabOne from "../../component/TabOne";
import Button from "../../component/Button";
import TabTwo from "../../component/TabTwo";
import TabThree from "../../component/TabThree";
import TabFour from "../../component/TabFour";
import TabFive from "../../component/TabFive";
import { STEP } from "../../constant";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { addBusiness, getBusinessInfo } from "../../store/business";

const AddBusiness = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [personalCompleted, setPersonalCompleted] = useState(false);
  const [businessCompleted, setBusinessCompleted] = useState(false);

  const dispatch = useDispatch();

  const [downloadLinks, setDownloadLinks] = useState({});

  useEffect(() => {
    console.log("This is from parent downloadLinks");
    console.log(downloadLinks);
  }, [downloadLinks]);

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log("data");
    console.log(data);
    const trackingNumber = data.iqamaNumber;
    const personal = personalCompleted;
    const personalInfo = {
      firstname: data.firstname,
      lastname: data.lastname,
      phoneNumberKsa: data.phoneNumberKsa,
      homeCountryNumber: data.homeCountryNumber,
      passportNumber: data.passportNumber,
      idCardNumber: data.idCardNumber,
      iqamaNumber: data.iqamaNumber,
      dateOfBirth: data.dateOfBirth,
      personCountry: data.personCountry,
      uploadIdCard: downloadLinks?.uploadidcard?.uploadidcard,
      uploadIqamaId: downloadLinks?.uploadiqamaid?.uploadiqamaid,
      uploadPicture: downloadLinks?.uploadPicture?.uploadPicture,
      uploadPassport: downloadLinks?.uploadPassport?.uploadPassport,
      status: "Completed",
    };
    const business = businessCompleted;
    const businessInfo = {
      companyNameEnglish: data.companyNameEnglish,
      companyNameArabic: data.companyNameArabic,
      businessPurpose: data.businessPurpose,
      licenseType: data.licenseType,
      sector: data.sector,
      country: data.country,
      email: data.email,
      uploadAgreement:
        downloadLinks?.uploadcustomeragreement?.uploadcustomeragreement,
      status: "Completed",
    };
    const parent = false;
    const parentCompany = {
      englishName: data.englishName,
      arabicName: data.arabicName,
      registrationNumber: data.registrationNumber,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      uploadRegistration:
        downloadLinks?.uploadcompanyRegistration?.uploadcompanyRegistration,
      uploadMemorandum: downloadLinks?.uploadmemorandom?.uploadmemorandom,
      uploadAudit: downloadLinks?.uploadAudit?.uploadAudit,
      status: "Completed",
    };

    const licence = false;
    const licenceInfo = {
      misaLience: data.misaLience,
      misaLienceissue: data.misaLienceissue,
      misaLienceexpiry: data.misaLienceexpiry,
      uploadLience: downloadLinks?.uploadmisa?.uploadmisa,
    };
    const portals = false;
    const portalInfo = {
      tin: data.tin,
      zactaUser: data.zactaUser,
      Zactapassword: data.Zactapassword,
      uploadVat: downloadLinks?.uploadvat?.uploadvat,
      uploadZakat: downloadLinks?.uploadzakat?.uploadzakat,
      qiwaUser: data.qiwaUser,
      qiwaPassword: data.qiwaPassword,
      muqeemNumber: data.muqeemNumber,
      muqeemEmail: data.muqeemEmail,
      muqeemPassword: data.muqeemPassword,
    };

    console.log(data);
    const formData = {
      trackingNumber,
      personal,
      personalInfo,
      business,
      businessInfo,
      parent,
      licence,
      portals,
    };

    if (parent) {
      formData.parentCompany = parentCompany;
    }

    if (licence) {
      formData.licenceInfo = licenceInfo;
    }

    if (portals) {
      formData.portalInfo = portalInfo;
    }

    console.log("formData");
    console.log(formData);

    dispatch(addBusiness(formData));
    dispatch(getBusinessInfo());
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  return (
    <div className="flex p-6 flex-col gap-4">
      <ToastContainer />
      <div className="px-10">
        <h1 className="font-bold text-2xl">Add New Business</h1>
        <div className="border-t-2 relative mx-14 top-10 -z-10"></div>
        <div className="flex justify-between px-14 py-4">
          {STEP.map((title, index) => (
            <div className="flex flex-col gap-2 items-center" key={index}>
              <div
                className={` rounded-full w-12 h-12 flex items-center justify-center ${
                  index <= currentIndex ? "bg-black" : "bg-gray-200"
                }`}
              >
                <CircleUser color={index <= currentIndex ? "white" : "black"} />
              </div>
              {title.title}
            </div>
          ))}
        </div>
        <div className="rounded-2xl shadow-2xl py-8">
          <div>
            {currentIndex === 0 && (
              <TabOne
                downloadLinks={downloadLinks}
                setDownloadLinks={setDownloadLinks}
                register={register}
                errors={errors}
                onSubmit={onSubmit}
                personalCompleted={personalCompleted}
                setPersonalCompleted={setPersonalCompleted}
              />
            )}
            {currentIndex === 1 && (
              <TabTwo
                downloadLinks={downloadLinks}
                setDownloadLinks={setDownloadLinks}
                register={register}
                errors={errors}
                onSubmit={onSubmit}
                personalCompleted={businessCompleted}
                setPersonalCompleted={setBusinessCompleted}
              />
            )}
            {currentIndex === 2 && (
              <TabThree
                downloadLinks={downloadLinks}
                setDownloadLinks={setDownloadLinks}
                register={register}
                errors={errors}
                onSubmit={onSubmit}
              />
            )}
            {currentIndex === 3 && (
              <TabFour
                downloadLinks={downloadLinks}
                setDownloadLinks={setDownloadLinks}
                register={register}
                errors={errors}
                onSubmit={onSubmit}
              />
            )}
            {currentIndex === 4 && (
              <TabFive
                downloadLinks={downloadLinks}
                setDownloadLinks={setDownloadLinks}
                register={register}
                errors={errors}
                onSubmit={onSubmit}
              />
            )}
          </div>

          <div className="px-10 flex items-end justify-end">
            {currentIndex > 0 && (
              <Button
                onClick={handlePrevious}
                variant="primary"
                title="Previous"
              />
            )}
            {currentIndex < 4 && personalCompleted && (
              <Button onClick={handleNext} variant="primary" title="Next" />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentIndex === 4 && (
                <Button variant="primary" title="Submit" />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusiness;
