import { employeeLogin } from "../../Api/employee";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginValidation } from "../../ValidationSchemas/employeeValidation/login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployeeDetails } from "../../Redux/slice/employeeSlice";
import Details from "./Details";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await employeeLogin(values);
      setEmployeeId(res.data.employeeData._id);

      if (!res.data.isDataHave) {
        setOpenDetails(true);
        return;
      }
      localStorage.setItem("employeeToken", res.data.token);
      dispatch(
        setEmployeeDetails({
          token: res.data.token,
          employee: res.data.employeeData,
        })
      );
        navigate("/employee/home")
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    } finally {
      // Handle validation errors
      setLoading(false);
      // You can display error messages to the user or handle them as needed
    }
  };

  const { values, errors, touched, getFieldProps, handleSubmit } = useFormik({
    validationSchema: loginValidation,
    initialValues: {
      employeeId: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <>
      {openDetails ? (
        <Details employeeId={employeeId} />
      ) : (
        <section>
          <div className="relative items-center w-full px-5 py-36 mx-auto md:px-12 lg:px-20 max-w-7xl">
            <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
              <div className="flex flex-col">
                <div>
                  <h2 className="text-4xl text-black">Employee Login</h2>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-6 space-y-6">
                  <div className="col-span-full">
                    <label
                      className="block mb-3 text-sm font-medium text-gray-600"
                      name="employeeId"
                    >
                      Employee Id
                    </label>

                    <input
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      autoComplete="on"
                      name="employeeId"
                      placeholder="Employee Id"
                      type="text"
                      value={values.employeeId}
                      {...getFieldProps("employeeId")}
                    />
                    <div className="label">
                      {errors.employeeId && touched.employeeId && (
                        <small className="text-red-800">
                          {errors.employeeId}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      className="block mb-3 text-sm font-medium text-gray-600"
                      name="password"
                    >
                      Password
                    </label>
                    <input
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="******"
                      autoComplete="on"
                      name="password"
                      type="password"
                      value={values.password}
                      {...getFieldProps("password")}
                    />
                    <div className="label">
                      {errors.password && touched.password && (
                        <small className="text-red-800">
                          {errors.password}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <button
                      className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                      type="submit"
                    >
                      {loading ? (
                        <span className="loading loading-ring loading-xs"></span>
                      ) : (
                        "Submit your request"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;
