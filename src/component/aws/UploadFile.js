import React, { useState } from "react";
import { uploadFileToS3 } from "../../utils/UploadFileToS3";

const UploadFile = ({ name, label, setDownloadLink }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadFile, setDownloadFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const downloadURL = await uploadFileToS3(
        selectedFile,
        setIsLoading,
        (progress) => {
          console.log("Upload progress:", progress);
          // Optionally, you can update the progress UI
        }
      );

      setDownloadFile(downloadURL);
      // alert("File uploaded successfully");

      setDownloadLink({ [name]: downloadURL });
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    window.open(downloadFile, "_blank");
  };

  return (
    <div className="font-sans w-250 max-w-md">
      <label className="text-base text-gray-500 font-semibold mb-2 block">
        {label}
      </label>
      <input
        type="file"
        name={name}
        onChange={handleFileInput}
        className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
      />
      <button
        onClick={handleUpload}
        disabled={!selectedFile || isLoading || downloadFile}
        className={`py-2 px-4 rounded ${
          downloadFile || isLoading || downloadFile
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
        }`}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
      {downloadFile && (
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Download
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadFile;
