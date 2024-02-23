import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventForm } from "../../../Api/customer";
import { useState } from "react";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";
// import DynamicForm from "./DynamicForm";

function Booking() {
  const { eventUUID } = useParams();
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchEventForm();
  }, []);

  const fetchEventForm = async () => {
    try {
      const res = await getEventForm(eventUUID);
      if (res.data.fields) {
        setFormData(res.data.fields);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Function to handle blur events
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });

    // Validate the field on blur
    const field = formData.find((field) => field.label === name);
    if (!field) return;
    const error = validateField(field, formValues[name]);
    setFormErrors({ ...formErrors, [name]: error });
  };

  // Function to validate a single field
  const validateField = (field, value) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    return "";
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    // if (formData) {
    formData?.forEach((field) => {
      // if (!formValues[field.label]) {
      //   errors[field.label] = `${field.label} is required`;
      // }
      const error = validateField(field, formValues[field.label]);
      if (error) {
        errors[field.label] = error;
      }
    });
    // }

    // Update form errors
    setFormErrors(errors);

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      // Handle form submission logic here
      console.log("Form submitted:", formValues);
      setIsLoading(false);
    }
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
                {formData?.map((field) => (
                  <div key={field.label}>
                    <label htmlFor={field.label} className="label">
                      <span className="label-text text-base font-semibold">
                        {field.label}
                      </span>
                    </label>

                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Type Here..."
                      type={field.type}
                      id={field.label}
                      name={field.label}
                      value={formValues[field.label] || ""}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />

                    <div className="label">
                      {touchedFields[field.label] &&
                        formErrors[field.label] && (
                          <div className="error">{formErrors[field.label]}</div>
                        )}
                    </div>
                  </div>
                ))}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
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

export default Booking;
