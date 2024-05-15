import React from "react";

const FileUpload = ({  name, label }) => {
  return (
    <>
      <div class="font-[sans-serif] max-w-md mx-auto">
        <label class="text-base text-gray-500 font-semibold mb-2 block">
          {label}
        </label>
        <input
          type="file"
          name={name}
          // {...register(name, { required: true })}
          class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
        />
        {/* <p class="text-xs text-gray-400 mt-2">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p> */}
      </div>
    </>
  );
};

export default FileUpload;
