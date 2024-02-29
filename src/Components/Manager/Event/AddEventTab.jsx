/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import PreviewImage from "../Common/PreviewImage";
import { addEventValidation } from "../../../ValidationSchemas/managerValidation/addEvent";
import { useRef } from "react";
import useFileToDataURLConverter from "../../../CustomHooks/useFileToDataURLConverter";
import { addingNewEvent, editEvent } from "../../../Api/manager";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function AddEventTab({ setEvents, setLoading, editingEvent }) {
  const { manager } = useSelector((state) => state.managerSlice);

  const { convertFileToDataURL } = useFileToDataURLConverter();
  const fileRef = useRef(null);

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (editingEvent) {
        const res = await editEvent(values);
        setEvents((prevEvents) => [...prevEvents, res.data.event]);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        resetForm();
      } else {
        setLoading(true);
        const { image, ...restValues } = values;
        const dataURL = await convertFileToDataURL(image);
        const updatedValues = {
          ...restValues,
          image: dataURL,
          managerUUID: manager.uuid,
          managerId: manager._id
        };
        const res = await addingNewEvent(updatedValues);
        if (res) {
          setEvents((prevEvents) => [...prevEvents, res?.data?.event]);
        }
        resetForm();
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      // setEditingEvent(false);
      setLoading(false);
    }
  };

  const {
    setFieldValue,
    handleSubmit,
    getFieldProps,
    values,
    errors,
    touched,
    handleReset,
  } = useFormik({
    initialValues: {
      uuid: "",
      eventName: "",
      eventDescription: "",
      image: "",
    },
    validationSchema: addEventValidation,
    onSubmit,
  });

  if (editingEvent) {
    setFieldValue("eventName", editingEvent.eventName);
    setFieldValue("eventDescription", editingEvent.eventDescription);
    // setEditImage(event.eventImage);
    setFieldValue("uuid", editingEvent.uuid);
    // setFieldValue("imageBlob",event.imageBlob)
  }
  return (
    <main>
      <div className="py-4">
        <div className="h-auto border border-gray-200 border-dashed rounded-lg">
          <form
            onSubmit={handleSubmit}
            action=""
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md shadow-sm bg-gray-9 font-black">
              <div className="flex flex-col gap-6">
                <div>
                  <input
                    value={values.uuid}
                    {...getFieldProps("uuid")}
                    hidden
                  />
                  <label className="sr-only" htmlFor="eventName">
                    Name
                  </label>
                  <input
                    className="w-full rounded-md border-gray-200 p-3 text-sm"
                    placeholder="Event Name"
                    type="text"
                    id="eventName"
                    {...getFieldProps("eventName")}
                    value={values.eventName}
                  />
                  {errors.eventName && touched.eventName && (
                    <small className="text-red-800">{errors.eventName}</small>
                  )}
                </div>
                <div>
                  <label className="sr-only" htmlFor="eventDescription">
                    description
                  </label>
                  <textarea
                    className="w-full rounded-md border-gray-200 p-3 text-sm"
                    placeholder="Description"
                    type="text"
                    rows={10}
                    id="eventDescription"
                    {...getFieldProps("eventDescription")}
                    value={values.eventDescription}
                  />
                  {errors.eventDescription && touched.eventDescription && (
                    <small className="text-red-800">
                      {errors.eventDescription}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className=" flex justify-between ">
                  <label className="m-2" htmlFor="image">
                    Image
                  </label>
                  <a
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0"
                      />
                    </svg>
                  </a>
                </div>
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
                <div>
                  <div className="w-full h-60 rounded-md border border-gray-200 p-3 ">
                    {values.image && <PreviewImage file={values.image} />}
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="flex flex-col p-4 items-end justify-end space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
              <button
                type="reset"
                className="btn bg-white hover:border-black hover:bg-blue-gray-50  text-black stroke-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn bg-red-800 hover:bg-red-900 hover:border-black text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddEventTab;
