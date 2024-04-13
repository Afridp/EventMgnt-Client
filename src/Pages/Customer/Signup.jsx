
import { useState } from "react";
import { customerSignup } from "../../Api/customer";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupValidation } from "../../ValidationSchemas/customerValidation/signup";
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars, react/prop-types
function Signup() {
  const mid = localStorage.getItem('mid')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let res = await customerSignup(values,mid);

      const { otpId, customerId } = res.data;
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate(`/${mid}/otp`, {
        state: {
          otpId: otpId,
          customerId: customerId,
          customerEmail: values.email,
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
    getFieldProps,
    touched,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
      password: "",
      cpassword: "",
    },
    validationSchema: signupValidation,
    onSubmit,
  });
  return (
    <section className="bg-gray-200 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border mt-48 md:mt-24 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  {...getFieldProps("email")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required=""
                />

                {errors.email && touched.email && (
                  <small className="text-red-800">{errors.email}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={values.username}
                  {...getFieldProps("username")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="typehere.."
                  required=""
                />

                {errors.username && touched.username && (
                  <small className="text-red-800">{errors.username}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Your mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={values.mobile}
                  {...getFieldProps("mobile")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="92838.."
                  required=""
                />

                {errors.mobile && touched.mobile && (
                  <small className="text-red-800">{errors.mobile}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  {...getFieldProps("password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />

                {errors.password && touched.password && (
                  <small className="text-red-800">{errors.password}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="cpassword"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  value={values.cpassword}
                  {...getFieldProps("cpassword")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />

                {errors.cpassword && touched.cpassword && (
                  <small className="text-red-800">{errors.cpassword}</small>
                )}
              </div>

              {/* <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-semibold text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div> */}
              {/* </div> */}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-500 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? "Creating..." : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={`/${mid}/signin`}
                  className="font-semibold text-blue-600 hover:underline dark:text-primary-500"
                >
                  {" "}
                  Signin here{" "}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
