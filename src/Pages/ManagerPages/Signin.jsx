/* eslint-disable react/no-unknown-property */
import { Typography } from "@material-tailwind/react";
import { managerSignin } from "../../Api/manager";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setManagerDetails } from "../../Redux/slice/managerSlice";
import { useFormik } from "formik";
import { signinValidation } from "../../ValidationSchemas/managerValidation/signin";
import { toast } from "react-toastify";
import { useState } from "react";

function Signin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const { values, errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      signinDetails: "",
      password: "",
    },
    validationSchema: signinValidation,
    onSubmit,
  });

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await managerSignin(values);

      const { token, managerData } = res.data;
      localStorage.setItem("managerToken", token);

      dispatch(
        setManagerDetails({
          token: token,
          manger: managerData,
        })
      );
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/manager/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center pt-48">
      <form onSubmit={handleSubmit} className="w-80 sm:w-95">
        <Typography
          color="gray"
          className="text-xl font-semibold mb-8 text-center"
        >
          Sign In
        </Typography>

       
        <label
          htmlFor="Username or Email"
          className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="username or Email"
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="username ro Email"
            value={values.signinDetails}
            {...getFieldProps("signinDetails")}
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Username or Email
          </span>
        </label>
        <div className="label">
          {errors.signinDetails && touched.signinDetails && (
            <small className="text-red-800">{errors.signinDetails}</small>
          )}
        </div>
        

        <label
          htmlFor="password"
          className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="password"
            id="password"
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="password"
            value={values.password}
            {...getFieldProps("password")}
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Password
          </span>
        </label>
        <div className="label">
          {errors.password && touched.password && (
            <small className="text-red-800">{errors.password}</small>
          )}
        </div>

        <div className="flex justify-center">
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <Typography color="gray" className="mt-4 text-center font-normal">
          New Member?{" "}
          <Link to="/manager/signup" className="text-blue-600">
            {" "}
            Signup
          </Link>
        </Typography>
      </form>
    </div>
  );
}

export default Signin;
