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
      console.log(managerData);
      dispatch(
        setManagerDetails({
          token: token,
          manager: managerData,
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

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email Or Username</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="signinDetails"
            id="signinDetails"
            value={values.signinDetails}
            {...getFieldProps("signinDetails")}

         

            // * short usage of these three *

            // {...getFieldProps("cemail")}
          />
          <div className="label">
            {errors.signinDetails && touched.signinDetails && (
              <small className="text-red-800">{errors.signinDetails}</small>
            )}
          </div>
        </label>
       

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="password"
            id="password"
            value={values.password}
            {...getFieldProps("password")}

         

            // * short usage of these three *

            // {...getFieldProps("cemail")}
          />
      
        <div className="label">
          {errors.password && touched.password && (
            <small className="text-red-800">{errors.password}</small>
          )}
        </div>
        </label>

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
            Signup
          </Link>
        </Typography>
      </form>
    </div>
  );
}

export default Signin;
