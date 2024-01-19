import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import  { signinValidation } from "../../ValidationSchemas/clientValidation/signin";
import {  useNavigate, Link } from "react-router-dom";
import { clientSignin } from "../../Api/client";
import { useEffect, useState } from "react";
import { Tooltip, initTE } from "tw-elements";
import { useDispatch } from "react-redux";
import { setClientDetails } from "../../Redux/slice/clientSlice";

// import OAuth from "../../components/studentComponent/OAuth";

const Login = () => {

  const [loading,setLoading]= useState(false)

  useEffect(() => {
    initTE({ Tooltip });
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(values) {
    try {
      setLoading(true)
      const res = await clientSignin(values);
      
        const { clientData, token } = res.data;
        localStorage.setItem("clientToken", token)

        dispatch(
          setClientDetails({
            token : token,
            client : clientData
          })
        )
        toast.success(res.data.message,{position: toast.POSITION.TOP_CENTER});

        navigate("/");

    } finally {
      setLoading(false)
    }
  }
  const {
    values,
    touched,
    getFieldProps,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      signinDetails: "",
      password: "",
    },
    validationSchema: signinValidation,
    onSubmit,
  });
  return (
    <section className="bg-white dark:bg-gray-900">
      {/* // <section className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://images.pexels.com/photos/5779170/pexels-photo-5779170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}> */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-slate-300  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email or Username
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.signinDetails}
                  {...getFieldProps("signinDetails")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                {errors.signinDetails && touched.signinDetails && (
                  <small className="text-red-800">{errors.signinDetails}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={values.password}
                  {...getFieldProps("password")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                  {errors.password && touched.password && (
              <small className="text-red-800">{errors.password}</small>
            )}
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-start">
                  {/* <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div> */}
                  {/* <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div> */}
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                { loading ? 'Signing In..' : 'Sign in' }
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont have an account yet?{" "}
               
                  <Link to='/signup' className='font-medium text-primary-600 hover:underline dark:text-primary-500'> Signup here </Link>
                
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
