/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormik } from "formik";
import { personalFormValidation } from "../../../ValidationSchemas/customerValidation/eventBookForm";

function PersonalInfoForm({ setPersonalValues, handleNext, handlePrev }) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    setPersonalValues(values);
    setIsLoading(false);
    handleNext();
  };

  const { values, handleBlur, handleSubmit, errors, handleChange, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phoneNumber: "",
        alternativePhoneNumber: "",
      },
      validationSchema: personalFormValidation,
      onSubmit,
    });

  return (
    <>
      <section className="min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-2xl border my-20 lg:col-span-3 lg:p-12 fade-ef">
            <form action="" className="space-y-4" onSubmit={handleSubmit}>
              <span className="flex items-center">
                <span className="pr-6 font-bold font-mono text-orange-900">
                  Personal Details
                </span>
                <span className="h-px flex-1 bg-black"></span>
              </span>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Name.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="label">
                    {errors.name && touched.name && (
                      <small className="text-red-800">{errors.name}</small>
                    )}
                  </div>
                </div>

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Email Address.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Email"
                    type="email"
                    id="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="label">
                    {errors.email && touched.email && (
                      <small className="text-red-800">{errors.email}</small>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Phone Number.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Phone Number"
                    type="text"
                    id="phoneNumber"
                    value={values.phoneNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Alternative Phone Number.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Alternative Phone Number"
                    type="text"
                    id="alternativePhoneNumber"
                    value={values.alternativePhoneNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
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

              <div className="mt-5 flex gap-3 justify-end">
                <div
                  type="btn"
                  className="inline-block w-full bg-black px-5 py-3 font-medium  text-white sm:w-auto cursor-pointer"
                  onClick={handlePrev}
                >
                  {isLoading ? "Loading.." : "Back"}
                </div>
                <button
                  type="submit"
                  className="inline-block w-full bg-black px-5 py-3 font-medium  text-white sm:w-auto"
                >
                  {isLoading ? "Loading.." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default PersonalInfoForm;
