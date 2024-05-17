import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../store/user";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import InputText from "../../component/InputText";
import { loginFormFields } from "../../constant";
import Loading from "../../component/loading";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false); // Added loading state

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true); // Set loading to true when form is submitted
    dispatch(loginUser(data)).then(() => {
      setLoading(false); // Set loading to false when login is successful
    });
  };

  return (
    <div className="bg-white relative lg:py-20">
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Render loading component when loading is true */}
          <ToastContainer />
          <div className="flex flex-col items-center justify-between pt-0 md:pr-10 pb-0 md:pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
            <div className="flex flex-col items-center w-full pt-5 px-4 md:pr-10 pb-20 md:pl-10 lg:pt-20 lg:flex-row">
              <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                  <img src="./images/imbs.png" class="btn-" alt="" />
                </div>
              </div>
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                    <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                      Login
                    </p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                      {loginFormFields.map((data, index) => (
                        <div className="relative">
                          <InputText
                            label={data.label}
                            name={data.name}
                            type={data.type}
                            placeholder={data.placeholder}
                            variant={data.variant}
                            register={register}
                            errors={errors}
                            errorTitle={data.errorTitle}
                          />
                        </div>
                      ))}
                      <div className="relative">
                        <button
                          type="submit"
                          className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                        >
                          Login
                        </button>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-sm">
                          Account Doesn't Exist ?{` `}
                          <strong>
                            <Link to="/register">Register here </Link>
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
                <svg
                  viewbox="0 0 91 91"
                  className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
              fill-current"
                >
                  <g stroke="none" strokewidth="1" fillrule="evenodd">
                    <g fillrule="nonzero">
                      <g>{/* SVG circles */}</g>
                    </g>
                  </g>
                </svg>
                <svg
                  viewbox="0 0 91 91"
                  className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
              fill-current"
                >
                  <g stroke="none" strokewidth="1" fillrule="evenodd">
                    <g fillrule="nonzero">
                      <g>{/* SVG circles */}</g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
