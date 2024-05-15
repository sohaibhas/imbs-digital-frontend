import React from "react";

const InputText = ({
  register,
  errors,
  title,
  errorTitle,
  placeholder,
  type,
  name,
  label,
  variant,
  defaultValue,
  disabled,
}) => {
  return (
    <>
      {variant === "primary" && (
        <>
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
            {label}
          </p>
          <input
            placeholder={placeholder}
            type={type}
            name={name}
            disabled={disabled}
            {...register(name, { required: true })}
            className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
          />
          {errors[name]?.type === "required" && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errorTitle || `${title} is required`}
            </p>
          )}
        </>
      )}
      {variant === "secondary" && (
        <>
          <input
            type={type}
            name={name}
            value={defaultValue}
            disabled={disabled}
            {...register(name)}
            className={`${
              defaultValue ? "bg-gray-800 text-gray-95000" : "" // Change color to gray when disabled
            } block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer`}
            placeholder={placeholder}
            // required
          />
          <label
            for="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {label}
          </label>
          {errors[name]?.type === "required" && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errorTitle || `${title} is required`}
            </p>
          )}
        </>
      )}
      {variant === "textArea" && (
        <>
          <div className="col-span-2">
            <label
              for="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {title}
            </label>
            <textarea
              id="description"
              name={name}
              disabled={defaultValue ? true : false}
              rows="2"
              {...register(name)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={placeholder}
            ></textarea>
          </div>
          {errors[name]?.type === "required" && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errorTitle || `${title} is required`}
            </p>
          )}
        </>
      )}
      {variant === "date" && (
        <div className="relative">
          <p className="absolute left-1 text-[12px] -top-3 text-gray-600 bg-white px-1">
            {label}
          </p>
          <input
            type="date"
            name={name}
            {...register(name)}
            className=" border-b-2 border-gray-300 bg-white focus:outline-none focus:border-black block w-full pb-0 pt-4 pl-2 text-base"
          />
        </div>
      )}
    </>
  );
};

export default InputText;
