import { uploadFileToS3 } from "./UploadFileToS3";

export const UploadFileNew = async (dataFile, setDownloadLinkIdCard) => {
  if (!dataFile) {
    alert("Please select a file to upload");
    return;
  }

  try {
    const downloadURL = await uploadFileToS3(dataFile, (progress) => {
      console.log("Upload progress:", progress);
      // Optionally, you can update the progress UI
    });

    // console.log("Upload successful. Download URL:", downloadURL);
    alert("File uploaded successfully");

    setDownloadLinkIdCard(downloadURL);
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    console.log("Final");
  }
};
