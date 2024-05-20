import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUserInfo, updateUser } from "../../../store/user";

const UpdateUser = ({ userId, onClose, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.appUser.singleUser);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);
  

  useEffect(() => {
    if (singleUser) {
      setValue("name", singleUser.name);
      setValue("email", singleUser.email);
      setValue("phoneNumber", singleUser.phoneNumber);
      setValue("role", singleUser.role);
    }
  }, [singleUser, setValue]);

  const onSubmit = async (data) => {
    console.log("data");
    console.log(data);
    try {
      dispatch(updateUser({ userId, data }));
      onClose();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              {...register("phoneNumber")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              name="role"
              {...register("role")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors?.password?.type === "required" && (
              <p
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {`Password is required`}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
