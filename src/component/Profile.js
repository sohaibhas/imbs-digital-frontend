import React, { useState } from "react";

const Profile = ({ isOpenProfile, setIsOpenProfile, user }) => {
  return (
    <div className="max-w-full">
      {isOpenProfile && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative items-center justify-center bg-white w-[60%] h-[480px] p-4 rounded-lg shadow-lg">
              <div className="absolute top-0 right-0 p-2">
                <button
                  onClick={() => setIsOpenProfile(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="flex gap-6 flex-col items-center">
                <img
                  className="rounded-full w-52 h-52"
                  src="https://cdn.pixabay.com/photo/2023/04/24/17/01/the-fashion-7948588_1280.jpg"
                  alt="user"
                />
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="">{user.email}</p>
                <p className="">{user.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
