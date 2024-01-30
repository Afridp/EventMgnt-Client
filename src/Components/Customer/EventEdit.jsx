import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editBooked, fetchEvent } from "../../Api/customer";
import { useFormik } from "formik";
import { eventEditFormValidation } from "../../ValidationSchemas/customerValidation/eventEditForm";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

function EventEdit() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchEvent(eventId);
        setEventData(res.data.event);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await editBooked(values, eventId);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate("/myEvents");
    } finally {
      setLoading(false);
    }
  };
  const {
    values,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    touched,
  } = useFormik({
    initialValues: {
      guestRequirement: eventData?.guestRequirement || "",
      cateringNeeds: eventData?.cateringNeeds || "",
      eventName: eventData?.eventName || "",
      eventCategory: eventData?.eventCategory || "",
      venueName: eventData?.venueName || "",
      venueType: eventData?.venueType || "",
      noofGuests: eventData?.noofGuests || "",
      numberOfServices: eventData?.numberOfServices || "",
      foodPreference: eventData?.foodPreference || "",
      cuisines: eventData?.cuisines || "",
      desiredEntertainment: eventData?.desiredEntertainment || "",
      entertainer: eventData?.entertainer || "",
      eventTheme: eventData?.eventTheme || "",
      otherTheme: eventData?.otherTheme || "",
      themeImage: "",
      audioVisual: eventData?.audioVisual || "",
      techSupport: eventData?.techSupport || "",
      additionalRequirement: eventData?.additionalRequirement || "",
      name: eventData?.name || "",
      email: eventData?.email || "",
      phoneNumber: eventData?.phoneNumber || "",
      alternativePhoneNumber: eventData?.alternativePhoneNumber || "",
    },
    validationSchema: eventEditFormValidation,
    onSubmit,
    enableReinitialize: true,
  });

  const handleRadioChange = (value) => {
    setFieldValue("guestRequirement", value);
    setFieldTouched("guestRequirement", true);
  };
  if (isLoading) {
    return (
      <div className="grid h-screen place-content-center bg-white">
        <div className="flex flex-row gap-2 ">
          <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl  px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-2xl border my-20  lg:col-span-3 lg:p-12">
            <form action="" className="space-y-4" onSubmit={handleSubmit}>
              <span className="flex items-center">
                <span className="pr-6 font-bold font-mono text-orange-900">
                  Event Details
                </span>
                <span className="h-px flex-1 bg-black"></span>
              </span>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      A unique and descriptive name for the event.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Event Name"
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={values.eventName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="label">
                    {errors.eventName && touched.eventName && (
                      <small className="text-red-800">{errors.eventName}</small>
                    )}
                  </div>
                </div>

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Specify the category or type of event
                    </span>
                  </div>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    id="eventCategory"
                    value={values.eventCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled defaultValue={true}>
                      Select an option
                    </option>
                    <option value="Confrence">Confrence</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Concert">Concert</option>
                    <option value="Other">Other</option>
                    {/* Add more options as needed */}
                  </select>
                  <div className="label">
                    {errors.eventCategory && touched.eventCategory && (
                      <small className="text-red-800">
                        {errors.eventCategory}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Venue Name.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Venue Name"
                    type="text"
                    id="venueName"
                    value={values.venueName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="label">
                    {errors.venueName && touched.venueName && (
                      <small className="text-red-800">{errors.venueName}</small>
                    )}
                  </div>
                </div>

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Venue Type.
                    </span>
                  </div>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    id="venueType"
                    value={values.venueType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value="" disabled defaultValue={true}>
                      Select an option
                    </option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Banquet hall">Banquet hall</option>
                    <option value="Garden">Garden</option>
                    <option value="Other">Other</option>
                    {/* Add more options as needed */}
                  </select>
                  <div className="label">
                    {errors.venueType && touched.venueType && (
                      <small className="text-red-800">{errors.venueType}</small>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      From Date.
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm my-anchor-element"
                      type="text"
                      id="startDate"
                      value={eventData.startDate}
                      disabled
                    />
                    <Tooltip anchorSelect=".my-anchor-element" place="top">
                      Event date cannot be changed because date is reserved for
                      this event,if you wish to change please cancell this event
                      and create new one
                    </Tooltip>
                  </div>
                  <div className="label ml-12">
                    {errors.startDate && touched.startDate && (
                      <small className="text-red-800">{errors.startDate}</small>
                    )}
                  </div>
                </div>

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      To Date.
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">To:</span>

                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm my-anchor-element"
                      type="text"
                      id="endDate"
                      value={eventData.endDate}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Expected Number of Guests:
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Type here"
                    type="number"
                    id="noofGuests"
                    value={values.noofGuests}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="label">
                    {errors.noofGuests && touched.noofGuests && (
                      <small className="text-red-800">
                        {errors.noofGuests}
                      </small>
                    )}
                  </div>
                </div>

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Special Guest Requirements:
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-2">
                    <label htmlFor="yes">
                      <input
                        type="radio"
                        id="yes"
                        name="guestRequirement"
                        value="yes"
                        checked={values.guestRequirement === "yes"}
                        onChange={() => handleRadioChange("yes")}
                        onBlur={handleBlur}
                      />
                      <span className="ml-2">Yes</span>
                    </label>

                    <label htmlFor="no">
                      <input
                        type="radio"
                        id="no"
                        name="guestRequirement"
                        value="no"
                        checked={values.guestRequirement === "no"}
                        onChange={() => handleRadioChange("no")}
                      />
                      <span className="ml-2">No</span>
                    </label>

                    <label htmlFor="maybe">
                      <input
                        type="radio"
                        id="maybe"
                        name="guestRequirement"
                        value="maybe"
                        checked={values.guestRequirement === "maybe"}
                        onChange={() => handleRadioChange("maybe")}
                      />
                      <span className="ml-2">Maybe</span>
                    </label>

                    <label htmlFor="notAtAll">
                      <input
                        type="radio"
                        id="notAtAll"
                        name="guestRequirement"
                        value="notAtAll"
                        checked={values.guestRequirement === "notAtAll"}
                        onChange={() => handleRadioChange("notAtAll")}
                      />
                      <span className="ml-2">Not at all</span>
                    </label>
                  </div>
                  <div className="label">
                    {errors.guestRequirement && touched.guestRequirement && (
                      <small className="text-red-800">
                        {errors.guestRequirement}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Catering Needs:
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 ml-2">
                    <label htmlFor="yes">
                      <input
                        type="radio"
                        id="yes"
                        name="cateringNeeds"
                        value="yes"
                        className="radio"
                        checked={values.cateringNeeds === "yes"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className="ml-2">Yes</span>
                    </label>

                    <label htmlFor="no">
                      <input
                        type="radio"
                        id="no"
                        name="cateringNeeds"
                        value="no"
                        className="radio"
                        checked={values.cateringNeeds === "no"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div className="label">
                    {errors.cateringNeeds && touched.cateringNeeds && (
                      <small className="text-red-800">
                        {errors.cateringNeeds}
                      </small>
                    )}
                  </div>
                </div>

                {values.cateringNeeds === "yes" && (
                  <div>
                    <div className="label">
                      <span className="label-text text-base font-semibold">
                        No of catering services required.
                      </span>
                    </div>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Number of Services"
                      type="number"
                      id="numberOfServices"
                      value={values.numberOfServices}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <div className="label">
                      {errors.numberOfServices && touched.numberOfServices && (
                        <small className="text-red-800">
                          {errors.numberOfServices}
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Food Preference.
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 ml-2">
                    <label htmlFor="yes">
                      <input
                        type="radio"
                        id="yes"
                        name="foodPreference"
                        value="yes"
                        className="radio"
                        checked={values.foodPreference === "yes"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className="ml-2">Yes</span>
                    </label>

                    <label htmlFor="no">
                      <input
                        type="radio"
                        id="no"
                        name="foodPreference"
                        value="no"
                        className="radio"
                        checked={values.foodPreference === "no"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div className="label">
                    {errors.foodPreference && touched.foodPreference && (
                      <small className="text-red-800">
                        {errors.foodPreference}
                      </small>
                    )}
                  </div>
                </div>

                {values.foodPreference === "yes" && (
                  <div>
                    <div className="label">
                      <span className="label-text text-base font-semibold">
                        Any dietary restrictions or specific cuisines preferred.
                      </span>
                    </div>
                    <textarea
                      id="cuisines"
                      className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                      rows="4"
                      placeholder="Enter any additional cuisines notes..."
                      name="cuisines"
                      value={values.cuisines}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    <div className="label">
                      {errors.cuisines && touched.cuisines && (
                        <small className="text-red-800">
                          {errors.cuisines}
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Desired Entertainment.
                    </span>
                  </div>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    id="desiredEntertainment"
                    value={values.desiredEntertainment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled defaultValue={true}>
                      Select an option
                    </option>
                    <option value="Performers">Performers</option>
                    <option value="Speakers">Speakers</option>
                    <option value="Activities">Activities</option>
                    <option value="Dance Performance">Dance Performance</option>
                    <option value="DJ">DJ</option>
                    <option value="Live Music">Live Music</option>
                    <option value="Other">Others</option>
                    {/* Add more options as needed */}
                  </select>

                  <div className="label">
                    {errors.desiredEntertainment &&
                      touched.desiredEntertainment && (
                        <small className="text-red-800">
                          {errors.desiredEntertainment}
                        </small>
                      )}
                  </div>
                </div>

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Specify the entertainer to be invited.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Entertainer"
                    type="text"
                    id="entertainer"
                    value={values.entertainer}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="label">
                    {errors.entertainer && touched.entertainer && (
                      <small className="text-red-800">
                        {errors.entertainer}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Specify the Event Themes.
                    </span>
                  </div>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    id="eventTheme"
                    value={values.eventTheme}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled defaultValue={true}>
                      Select an option
                    </option>
                    <option value="Back to the 80s">Back to the 80s</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Grand Masked Ball">Grand Masked Ball</option>
                    <option value="Enchanted Forest">Enchanted Forest</option>
                    <option value="Peaky Blinders">Peaky Blinders</option>
                    <option value="Western Country Chic">
                      Western Country Chic
                    </option>
                    <option value="1950s American Diner">
                      1950s American Diner
                    </option>
                    <option value="Outerspace">Outerspace</option>
                    <option value="others">Others</option>
                    {/* Add more options as needed */}
                  </select>
                  <div className="label">
                    {errors.eventTheme && touched.eventTheme && (
                      <small className="text-red-800">
                        {errors.eventTheme}
                      </small>
                    )}
                  </div>
                </div>
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Specify if any other.
                    </span>
                  </div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Specify Other Theme"
                    type="text"
                    id="otherTheme"
                    value={values.otherTheme}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="label">
                    {errors.otherTheme && touched.otherTheme && (
                      <small className="text-red-800">
                        {errors.otherTheme}
                      </small>
                    )}
                  </div>
                </div>

                {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Upload the image for reference.
                    </span>
                  </div>

                  <input
                    // ref={fileref}
                    className="peer sr-only"
                    id="clickable"
                    type="file"
                    tabIndex="-1"
                    name="themeImage"
                    // value={values.themeImage}
                    onChange={(e) =>
                      setFieldValue("themeImage", e.target.files[0])
                    }
                  />

                  <Tooltip anchorSelect="#clickable" clickable>
                    {eventData.themeImage ? (
                      <a
                        href={eventData.themeImage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <small>{eventData.themeImage}</small>
                      </a>
                    ) : (
                      <small>upload</small>
                    )}
                  </Tooltip>

                  <label
                    htmlFor="themeImage"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-defaultChecked:border-black peer-defaultChecked:bg-black peer-defaultChecked:text-white"
                    tabIndex="0"
                    id="clickable"
                  >
                    {eventData.themeImage ? (
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

                  <div className="label">
                    {errors.themeImage && touched.themeImage && (
                      <small className="text-red-800">
                        {errors.themeImage}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Audio/Visual Needs.
                    </span>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Yes</span>
                      <input
                        type="radio"
                        name="audioVisual"
                        className="radio defaultChecked:bg-blue-500"
                        value="yes"
                        checked={values.audioVisual === "yes"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">No</span>
                      <input
                        type="radio"
                        name="audioVisual"
                        className="radio defaultChecked:bg-blue-500"
                        value="yes"
                        id="yes"
                        checked={values.audioVisual === "yes"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>

                  <div className="label">
                    {errors.audioVisual && touched.audioVisual && (
                      <small className="text-red-800">
                        {errors.audioVisual}
                      </small>
                    )}
                  </div>
                </div>

                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Any technical support needed during the event.
                    </span>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Yes</span>
                      <input
                        type="radio"
                        name="techSupport"
                        className="radio defaultChecked:bg-blue-500"
                        value="yes"
                        checked={values.techSupport === "yes"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">No</span>
                      <input
                        type="radio"
                        name="techSupport"
                        className="radio defaultChecked:bg-red-500"
                        value="no"
                        checked={values.techSupport === "no"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                  <div className="label">
                    {errors.techSupport && touched.techSupport && (
                      <small className="text-red-800">
                        {errors.techSupport}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="label">
                  <span className="label-text text-base font-semibold">
                    Additional Requirements.
                  </span>
                </div>
                <textarea
                  id="additionalRequirement"
                  className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                  rows="4"
                  placeholder="Enter any additional requirement notes..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.additionalRequirement}
                ></textarea>
                <div className="label">
                  {errors.additionalRequirement &&
                    touched.additionalRequirement && (
                      <small className="text-red-800">
                        {errors.additionalRequirement}
                      </small>
                    )}
                </div>
              </div>

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

              <div className="mt-5">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  {loading ? "Submiting.." : "Submit Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventEdit;
