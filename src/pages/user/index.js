import React, { useEffect } from "react";
import Button from "../../component/Button";
import Table from "../../component/Table";
import { UserTableDataHeader } from "../../constant";
import { getUserInfo } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();

  const userlist = useSelector((state) => state.appUser.userlist);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <div>
      <ToastContainer />
      <div className="flex px-10 p-6 flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">User List</h1>
          <div>
            <Link to="/register">
              <Button
                onClick={() => {}}
                variant={"primary"}
                title={"Add New User"}
              />
            </Link>
          </div>
        </div>
        <Table
          userlist={userlist}
          CompanyTableDataHeader={UserTableDataHeader}
        />
      </div>
    </div>
  );
};

export default User;
