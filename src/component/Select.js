const ModalSelect = ({ name, register, options }) => {
  return (
    <div>
      <select
        id={name} // Use the name as the ID for the select element
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        {...register(name, { required: true })}
      >
        <option value="">Select an option</option>{" "}
        {/* Add a default empty option */}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModalSelect;
