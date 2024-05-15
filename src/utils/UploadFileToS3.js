import AWS from "aws-sdk";
import { accessKeyId, secretAccessKey } from "./api";

export const uploadFileToS3 = (file, setImageLoading, setUploadProgress) => {
  return new Promise((resolve, reject) => {
    const S3_BUCKET = "imbsbucket";
    const REGION = "eu-north-1";

    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const fileExtension = file.name.split(".").pop(); // Get file extension
    const uniqueId = new Date().getTime(); // Generate unique identifier (timestamp)
    const fileName = `${uniqueId}-${file.name}`; // Append identifier to file name

    const params = {
      Bucket: S3_BUCKET,
      Key: fileName, // Use the modified file name
      Body: file,
    };

    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (evt) => {
      // File uploading progress
      const isComplete = parseInt(String((evt.loaded * 100) / evt.total)); // Convert to number
      if (isComplete === 100) {
        // Use strict equality comparison
        setImageLoading(false);
      }
      setUploadProgress(isComplete);
    });

    upload.send((err, data) => {
      if (err) {
        reject(err);
        setImageLoading(false);
      } else {
        console.log("URL", data.Location);
        resolve(data.Location); // URL of the uploaded file
      }
    });
  });
};
