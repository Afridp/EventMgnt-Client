import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { managerSignup } from "../../Api/manager";
import { signupValidation } from "../../ValidationSchemas/managerValidation/signup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let res = await managerSignup(values);

      const { otpId, managerId } = res.data;
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/manager/otp", {
        state: {
          otpId: otpId,
          managerId: managerId,
          managerEmail: values.cemail,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const {
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    // getFieldProps,
    touched,
  } = useFormik({
    initialValues: {
      username: "",
      cemail: "",
      cmobile: "",
      password: "",
      cpassword: "",
    },
    validationSchema: signupValidation,
    onSubmit,
  });

  return (
    <div className="flex items-center justify-center pt-12">
      <form onSubmit={handleSubmit} className="w-80 sm:w-95">
        <Typography
          color="black"
          className="text-xl font-semibold mb-8 text-center"
        >
          Sign Up
        </Typography>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Company Email Address</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="cemail"
            id="cemail"
            value={values.cemail}
            onBlur={handleBlur}
            onChange={handleChange}

            // * short usage of these three *

            // {...getFieldProps("cemail")}
          />
          <div className="label">
            {errors.cemail && touched.cemail && (
              <small className="text-red-800">{errors.cemail}</small>
            )}
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="username"
            id="username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="label">
            {errors.username && touched.username && (
              <small className="text-red-800">{errors.username}</small>
            )}
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Company Mobile</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="cmobile"
            id="cmobile"
            // {...getFieldProps("cmobile")}/
            value={values.cmobile}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="label">
            {errors.cmobile && touched.cmobile && (
              <small className="text-red-800">{errors.cmobile}</small>
            )}
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="password"
            id="password"
            // {...getFieldProps("password")}
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="label">
            {errors.password && touched.password && (
              <small className="text-red-800">{errors.password}</small>
            )}
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ConfirmPassword</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="cpassword"
            id="cpassword"
            // {...getFieldProps("cpassword")}
            value={values.cpassword}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="label">
            {errors.cpassword && touched.cpassword && (
              <small className="text-red-800">{errors.cpassword}</small>
            )}
          </div>
        </label>

        <div className="flex justify-center">
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </div>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/manager/signin" className="text-blue-600">
            Signin
          </Link>
        </Typography>
      </form>
    </div>
  );
}

export default SignUp;
