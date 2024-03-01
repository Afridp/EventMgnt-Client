import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookEvent, getEventForm } from "../../../Api/customer";
import { useState } from "react";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useGoogleMap from "../../../CustomHooks/useGoogleMap";
import { Autocomplete } from "@react-google-maps/api";

// import DynamicForm from "./DynamicForm";

function BookingForm() {
  const { customer } = useSelector((state) => state.customerSlice);
  const { eventId } = useParams();
  const [formData, setFormData] = useState();
  const [formValues, setFormValues] = useState({});
  const { isLoaded } = useGoogleMap();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});


  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchEventForm();
  }, []);

  const fetchEventForm = async () => {
    try {
      const res = await getEventForm(eventId);
      setFormData(res?.data?.fields);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScriptLoad = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("location"),
        {
          componentRestrictions: { country: "IN" },
          types: ["(cities)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place || !place.formatted_address) {
          setErrorLocation("Invalid location");
          return;
        }

        setLocation(place.formatted_address);
        setErrorLocation("");
      });

      return () => {
        autocomplete.unbindAll();
      };
    };

    if (isLoaded && window.google && window.google.maps) {
      handleScriptLoad();
    }
  }, [isLoaded]);
  console.log(formValues);
  // on submitting the submit button this function will work
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const errors = {};

        formData?.forEach((field) => {
            const error = validateField(field, formValues);
            if (error) {
                errors[field.label] = error;
            }
        });

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            const res = await bookEvent(
                { formValues, formData },
                customer._id,
                eventId
            );
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            navigate("/myEvents");
        }
    } finally {
        setIsLoading(false);
    }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (index, e) => {
    const { value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [`${formData[index].label}`]: value,
    }));
  };

  const handleOptionChange = (index, option, e, optionIndex, field) => {
    const { checked } = e.target;

    setFormValues((prevFormValues) => {
      const updatedValues = [...(prevFormValues[field.label] || [])]; // Copy the current values array

      if (checked) {
        updatedValues.push(option); // Add the selected option to the array
      } else {
        const index = updatedValues.indexOf(option);
        if (index !== -1) {
          updatedValues.splice(index, 1); // Remove the unselected option from the array
        }
      }

      return { ...prevFormValues, [field.label]: updatedValues }; // Update the formValues state
    });
  };

  // // this fn will work when input is actived or focused(only for handle blur inputs)
  // const handleBlur = (e) => {
  //   // got input name attribute which is labal
  //   const { name } = e.target;

  //   // setting values to touched fields [{ label : true},...]
  //   setTouchedFields({ ...touchedFields, [name]: true });

  //   // checking data fetched from bknd is available,if available finding that field that matches the-
  //   // current invocation input is selected,so if true the field have that feild {label: name ,type: 'text , required : true}
  //   const field = formData?.find((field) => field.label === name);
  //   // if there id no field it will return,handle blur not work(this return is not neccessary because there will no data in the field)
  //   if (!field) return;
  //   // passing that field {label: name,type: 'text, required : true} and current input value
  //   const error = validateField(field, formValues);
  //   setFormErrors({ ...formErrors, [name]: error });
  // };
  console.log(errorLocation);

  const handleBlur = (e) => {
    const { name, type, checked } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
    const fieldName = type === "checkbox" ? name.split("-")[0] : name;
    const field = formData?.find((field) => field.label === fieldName);

    if (!field || (type === "checkbox" && checked)) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
      return;
    }

    const error = validateField(field, formValues);
    setFormErrors({ ...formErrors, [fieldName]: error });
  };
  // do another validatefeild fn for handleblur
  const validateField = (field, formValues) => {
    if (field.required) {
        if (field.type === "Checkbox") {
            if (!formValues[field.label] || formValues[field.label].length === 0) {
                return `${field.label} requires at least one option to be selected`;
            }
        } else {
            const value = formValues[field.label];
            if (!value) {
                return `${field.label} is required`;
            }
        }
    }
    return "";
};


  return (
    <>
      <section className="min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-2xl border my-20 lg:col-span-3 lg:p-12 fade-ef">
            {/* {formData && <DynamicForm formData={formData} />} */}
            {loading ? (
              <LoaderManager loading={loading} />
            ) : (
              <form action="" className="space-y-4" onSubmit={handleSubmit}>
                <span className="flex items-center">
                  <span className="pr-6 font-bold font-mono text-orange-900">
                    Event Details
                  </span>
                  <span className="h-px flex-1 bg-black"></span>
                </span>
                {/* <input type="text" name="uuid" id="uuid" value={eventUUID} hidden/> */}
                {formData?.map((field, index) => (
                  <div key={field.label}>
                    <label htmlFor={field.label} className="label">
                      <span className="label-text text-base font-semibold">
                        {field.label}
                      </span>
                    </label>

                    {field.type === "Text" && (
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Type Here..."
                        type="text"
                        id={field.label}
                        name={field.label}
                        value={formValues[field.label] || ""}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    )}

                    {field.type === "Number" && (
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Enter a number..."
                        type="number"
                        id={field.label}
                        name={field.label}
                        value={formValues[field.label] || ""}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    )}

                    {field.type === "Email" && (
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Enter your email..."
                        type="email"
                        id={field.label}
                        name={field.label}
                        value={formValues[field.label] || ""}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    )}

                    {field.type === "Textarea" && (
                      <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Type here..."
                        id={field.label}
                        name={field.label}
                        value={formValues[field.label] || ""}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      ></textarea>
                    )}

                    {/* {field.type === "File" && (
                      <>
                        <input
                          // ref={fileref}
                          className="peer sr-only"
                          id="themeImage"
                          type="file"
                          tabIndex="-1"
                          name="themeImage"
                          // value={values.themeImage}
                          
                        />
                        <label
                          htmlFor="themeImage"
                          className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                          tabIndex="0"
                        >
                          {values.themeImage ? (
                            <svg
                              className="w-6 h-6 ml-32 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 h-6 ml-32 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 3c.3 0 .6.1.8.4l4 5a1 1 0 1 1-1.6 1.2L13 7v7a1 1 0 1 1-2 0V6.9L8.8 9.6a1 1 0 1 1-1.6-1.2l4-5c.2-.3.5-.4.8-.4ZM9 14v-1H5a2 2 0 0 0-2 2v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </label>
                      </>
                    )} */}

                    {field.type === "Map" && isLoaded && (
                      <Autocomplete>
                        <input
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Type here"
                          type="search"
                          id="location"
                          name="location"
                          // onBlur={handleBlur}
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                          required=""
                        />
                      </Autocomplete>
                    )}

                    {field.type === "Select" && (
                      <div className="mt-2 flex flex-row items-center">
                        <select
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          value={formValues[field.label] || ""}
                          onChange={(e) => handleSelectChange(index, e)}
                          onBlur={handleBlur}
                          name={field.label}
                        >
                          <option value="" disabled defaultChecked>
                            Select an option
                          </option>
                          {field?.selects?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {field.type === "Checkbox" && (
                      <div className="flex flex-row items-center gap-5 mt-2">
                        {field.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <input
                              type="checkbox"
                              id={`${field.label}-${option}`}
                              name={`${field.label}-${option}`}
                              checked={
                                formValues[field.label]?.includes(option) ||
                                false
                              }
                              onChange={(e) =>
                                handleOptionChange(
                                  index,
                                  option,
                                  e,
                                  optionIndex,
                                  field
                                )
                              }
                              onBlur={handleBlur}
                              className="checkbox"
                            />
                            <label
                              className="ml-2"
                              htmlFor={`${field.label}-${option}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="label">
                      {(touchedFields[field.label] ||
                        formErrors[field.label]) && (
                        <p className="text-error text-sm">
                          {formErrors[field.label]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-5 flex  justify-end">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium  text-white sm:w-auto"
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Submiting.." : "Submit Details"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BookingForm;
