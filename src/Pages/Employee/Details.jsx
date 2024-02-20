/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import { personalDetailsValidation } from "../../ValidationSchemas/employeeValidation/personalDetails";
import { useState } from "react";
import { employeeDetailsSubmit } from "../../Api/employee";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setEmployeeDetails } from "../../Redux/slice/employeeSlice";
import { useNavigate } from "react-router-dom";

function Details({ employeeId }) {
  // Add propTypes validation

  Details.propTypes = {
    employeeId: PropTypes.string.isRequired,
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      setLoading(true);
      let value = { ...values, employeeId };
      const res = await employeeDetailsSubmit(value);
      localStorage.setItem("employeeToken", res.data.token);

      dispatch(
        setEmployeeDetails({
          token: res.data.token,
          employee: res.data.employeeData,
        })
      );
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
      navigate("/employee/home");
    } finally {
      setLoading(false);
    }
  };
  const { values, errors, handleSubmit, getFieldProps, touched } = useFormik({
    validationSchema: personalDetailsValidation,
    initialValues: {
      name: "",
      phoneNumber: "",
      alternativePhoneNumber: "",
      age: "",
      gender: "",
      address: "",
    },
    onSubmit,
  });

  return (
    <>
      <section>
        <div className="mx-auto h-screen max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Welcome aboard, Captain! We're thrilled to have you join our
                team. To get started, please take a moment to submit your
                personal details. Your contribution is invaluable, and we're
                here to support you every step of the way.
              </p>

              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-red-600">
                  {" "}
                  Event Brigadge
                </a>

                <address className="mt-2 not-italic">
                  282 Kevin Brook, Imogeneborough, CA 58517
                </address>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                    value={values.name}
                    {...getFieldProps("name")}
                  />
                  <div className="label">
                    {errors.name && touched.name && (
                      <small className="text-red-800">{errors.name}</small>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Phone Number"
                      type="tel"
                      id="phoneNumber"
                      value={values.phoneNumber}
                      {...getFieldProps("phoneNumber")}
                    />
                    <div className="label">
                      {errors.phoneNumber && touched.phoneNumber && (
                        <small className="text-red-800">
                          {errors.phoneNumber}
                        </small>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Alternative Phone Number"
                      type="tel"
                      id="alternativePhoneNumber"
                      value={values.alternativePhoneNumber}
                      {...getFieldProps("alternativePhoneNumber")}
                    />
                    <div className="label">
                      {errors.alternativePhoneNumber &&
                        touched.alternativePhoneNumber && (
                          <small className="text-red-800">
                            {errors.alternativePhoneNumber}
                          </small>
                        )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="age">
                      Age
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Age"
                      type="number"
                      id="age"
                      value={values.age}
                      {...getFieldProps("age")}
                    />
                    <div className="label">
                      {errors.age && touched.age && (
                        <small className="text-red-800">{errors.age}</small>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="gender">
                      gender
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Gender"
                      type="text"
                      id="gender"
                      value={values.gender}
                      {...getFieldProps("gender")}
                    />
                    <div className="label">
                      {errors.gender && touched.gender && (
                        <small className="text-red-800">{errors.gender}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="Address">
                    Address
                  </label>

                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Address"
                    rows="8"
                    id="address"
                    value={values.address}
                    {...getFieldProps("address")}
                  ></textarea>
                  <div className="label">
                    {errors.address && touched.address && (
                      <small className="text-red-800">{errors.address}</small>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    {loading ? (
                      <span className="loading loading-ring loading-xs"></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;
