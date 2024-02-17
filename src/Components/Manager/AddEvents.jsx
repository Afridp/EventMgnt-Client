import { useState, useEffect, useRef } from "react";
import {
  addingNewEvent,
  editEvent,
  getEvents,
  listAndUnlist,
} from "../../Api/manager";
import { useFormik } from "formik";
import { addEventValidation } from "../../ValidationSchemas/managerValidation/addEvent";
import PreviewImage from "./PreviewImage";
import { toast } from "react-toastify";
import useFileToDataURLConverter from "../../CustomHooks/useFileToDataURLConverter";

const EventPage = () => {
  // const [editImage, setEditImage] = useState("");
  const [events, setEvents] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(false);
  const { convertFileToDataURL } = useFileToDataURLConverter();
  // const [showSubModal, setShowSubModal] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();

        setEvents(res?.data?.event);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };
    fetchEvents();
  }, [events]); // Empty dependency array ensures this effect runs only once on mount

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
        const updatedValues = { ...restValues, image: dataURL };
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
      setEditingEvent(false);
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
      _id: "",
      eventName: "",
      eventDescription: "",
      image: "",
      // imageBlob: "",
    },
    validationSchema: addEventValidation,
    onSubmit,
  });

  const handleEditEvent = async (event) => {
    setEditingEvent(true);
    setFieldValue("eventName", event.eventName);
    setFieldValue("eventDescription", event.eventDescription);
    // setEditImage(event.eventImage);
    setFieldValue("_id", event._id);
    // setFieldValue("imageBlob",event.imageBlob)
  };

  const handleListing = async (eventId) => {
    try {
      const res = await listAndUnlist(eventId);
      const updatedEvents = events.map((event) => {
        if (event._id === eventId) {
          return {
            ...event,
            isBlocked: res.data.event, // Assuming the response structure
          };
        }
        return event;
      });
      setEvents(updatedEvents);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 lg:p-12 mt-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="bg-gray-300 rounded-lg">
          <div className="p-4 space-y-6">
            <h2 className="text-xl mb-6 font-mono">Add Events</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Name:
                </label>
                <input value={values._id} {...getFieldProps("_id")} hidden />
                {/* <input
                  value={values.imageBlob}
                  {...getFieldProps("imageBlob")}
                  hidden
                /> */}
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={values.eventName}
                  {...getFieldProps("eventName")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.eventName && touched.eventName && (
                  <small className="text-red-800">{errors.eventName}</small>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="eventDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Description:
                </label>

                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  value={values.eventDescription}
                  {...getFieldProps("eventDescription")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.eventDescription && touched.eventDescription && (
                  <small className="text-red-800">
                    {errors.eventDescription}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="eventFiles"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Photo
                </label>
                <input
                  ref={fileRef}
                  hidden
                  type="file"
                  id="eventFiles"
                  name="image"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                  className="file-input w-full"
                />

                <button
                  type="button"
                  className={
                    editingEvent
                      ? "btn btn-disabled w-full bg-slate-400 hover:bg-slate-200"
                      : "btn w-full bg-slate-400 hover:bg-slate-200"
                  }
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  Select
                </button>

                {errors.image && touched.image && (
                  <small className="text-red-800">{errors.image}</small>
                )}
              </div>
              {/* {setEditImage
                ? editImage && <PreviewImage file={editImage} />
                : values.image && ( // Only render if previewImage is available
                    <PreviewImage file={values.image} />
                  )} */}
              {values.image && ( // Only render if previewImage is available
                <PreviewImage file={values.image} />
              )}
              <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
                <button
                  type="submit"
                  className="btn bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {Loading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    "Submit"
                  )}
                </button>

                <button
                  type="reset"
                  className="btn bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-span-2 bg-gray-200 rounded-lg">
          <div className="p-4 border-l">
            <h3 className="text-xl font-mono mb-4">Events</h3>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="font-semibold text-left bg-gray-100">
                    <th className="px-4 py-2 hidden">id</th>
                    {/* <th className="px-4 py-2 hidden">imageblob</th> */}
                    <th className="px-4 py-2">Photo</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events?.map((event) => (
                    <tr key={event._id} className="border-b hover:bg-gray-400">
                      <td className="px-4 py-2 hidden">{event._id}</td>
                      {/* <td className="px-4 py-2 hidden">{event.imageBlob}</td> */}
                      <td className="px-4 py-2">
                        <img
                          src={event.eventImage}
                          alt={event.eventName}
                          className="h-16 rounded"
                        />
                      </td>
                      <td className="px-4 py-2">{event.eventName}</td>
                      <td className="px-4 py-2">{event.eventDescription}</td>

                      <td className="px-4 py-2">
                        {/* change buttons to uiverse */}
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml- rounded"
                          onClick={() => handleEditEvent(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 ml-2 px-2 rounded"
                          onClick={() => handleListing(event._id)}
                        >
                          {event.list ? "Unlist" : "List"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
