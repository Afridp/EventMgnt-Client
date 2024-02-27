import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookEvent, getEventForm } from "../../../Api/customer";
import { useState } from "react";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// import DynamicForm from "./DynamicForm";

function BookingForm() {
  const { customer } = useSelector((state) => state.customerSlice);
  const { eventUUID } = useParams();
  const [formData, setFormData] = useState();
  const [formValues, setFormValues] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetchEventForm();
  }, []);

  const fetchEventForm = async () => {
    try {
      const res = await getEventForm(eventUUID);
      setFormData(res?.data?.fields);
    } finally {
      setLoading(false);
    }
  };

  // on submitting the submit button this function will work
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // creates a blank object named errors
      const errors = {};
      // if (formData) {
      // if formdata contains each field is taken to
      formData?.forEach((field) => {
        // if (!formValues[field.label]) {
        //   errors[field.label] = `${field.label} is required`;
        // }

        // to here to check that the validation
        const error = validateField(field, formValues[field.label]);
        if (error) {
          errors[field.label] = error;
        }
      });
      // }
      setFormErrors(errors);

      // if tthe errors object is empty which is there is no error all fields are available,continue with submitting
      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        // Handle form submission'

        const res = await bookEvent(
          { formValues, formData },
          customer._id,
          eventUUID
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

  // this fn will work when input is actived or focused(only for handle blur inputs)
  const handleBlur = (e) => {
    // got input name attribute which is labal
    const { name } = e.target;
    // setting values to touched fields [{ label : true},...]
    setTouchedFields({ ...touchedFields, [name]: true });

    // checking data fetched from bknd is available,if available finding that field that matches the-
    // current invocation input is selected,so if true the field have that feild {label: name ,type: 'text , required : true}
    const field = formData?.find((field) => field.label === name);
    // if there id no field it will return,handle blur not work(this return is not neccessary because there will no data in the field)
    if (!field) return;
    // passing that field {label: name,type: 'text, required : true} and current input value
    const error = validateField(field, formValues[name]);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const validateField = (field, value) => {
    // here checking the field obj contain required true and also value not blank
    if (field.required && !value) {
      // which is here if the feild have the required field and value is blank it will return required message
      return `${field.label} is required`;
    }
    // else return nothing
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
                {formData?.map((field) => (
                  <div key={field.label}>
                    <label htmlFor={field.label} className="label">
                      <span className="label-text text-base font-semibold">
                        {field.label}
                      </span>
                    </label>

                    {/* <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Type Here..."
                      type={field.type}
                      id={field.label}
                      name={field.label}
                      value={formValues[field.label] || ""}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    /> */}
                    {field.type === "text" && (
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

                    {field.type === "number" && (
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

                    {/* Add more conditions for other field types */}
                    {/* Example: */}
                    {field.type === "checkbox" && (
                      <div>
                        {Object.keys(field.options).map(
                          (option, optionIndex) => (
                            <div key={optionIndex}>
                              <input
                                type="checkbox"
                                id={`${field.label}-${option}`}
                                name={`${field.label}-${option}`}
                                checked={
                                  formValues[`${field.label}-${option}`] ||
                                  false
                                }
                                onChange={(e) =>
                                  handleOptionChange(index, option, e)
                                }
                                onBlur={handleBlur}
                              />
                              <label htmlFor={`${field.label}-${option}`}>
                                {field.options[option]}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    <div className="label">
                      {touchedFields[field.label] &&
                        formErrors[field.label] && (
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
