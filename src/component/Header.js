import React, { useState, useEffect } from "react";
import Menu from "./menu";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/user";
import Profile from "./Profile";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.appUser.data);

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const IsPath = location.pathname;

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  const handleCloseProfile = () => {
    setIsOpenProfile(true);
    setIsOpen(false);
  };

  return (
    <div>
      {IsPath === "/login" ||
      IsPath === "/register" ||
      IsPath === "/not-found" ? (
        ""
      ) : (
        <div className="p-6 gap-6 flex flex-col bg-[#1e4064] cursor-pointer">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-10">
              <Link to="/">
                <img src="./images/imbs_logo.png" width="150" alt="" />
              </Link>
              <div className="border-l-2 border-[#76787a]"></div>
              <h1 className="text-white">
                <span className="text-[#76787a] md:text-[15px] text-[10px]">Today</span> <br />
                {formattedDate}
              </h1>
              <div className="border-l-2 border-[#76787a]"></div>
              <h2 className="text-white">
                <span className="text-[#76787a]">Time</span> <br />
                {formattedTime}
              </h2>
            </div>
            <div className="md:flex items-center">
              <button
                className="text-white flex items-center gap-4"
                type="button"
                onClick={toggleMenu}
              >
                <label>{user?.name}</label>
                <img
                  className="rounded-full w-10 h-10"
                  src="./images/images_empt.png"
                  alt="user"
                />
                <ChevronDown color="white" />
              </button>
              {isOpen && (
                <div className="bg-white rounded-md p-4 px-6 w-[140px] absolute top-20 right-6 shadow-lg">
                  <ul className="flex flex-col gap-4">
                    <button
                      onClick={handleCloseProfile}
                      className="hover:text-blue-500 cursor-pointer"
                    >
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="hover:text-blue-500 cursor-pointer"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <Menu />
          </div>
        </div>
      )}
      <Profile
        setIsOpenProfile={setIsOpenProfile}
        isOpenProfile={isOpenProfile}
        user={user}
      />
    </div>
  );
};

export default Header;
