import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";

function TestTailwind() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(startDate);
  const [guestRequirement, setGuestRequirement] = useState("");
  const [cateringNeeds, setCateringNeeds] = useState("");

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
      // Add additional logic for start date
    } else if (type === "end") {
      setEndDate(date);
      // Add additional logic for end date
    }
  };
  const handleCateringNeedsChange = (event) => {
    setCateringNeeds(event.target.value);
  };

  const handleRadioChange = (value) => {
    setGuestRequirement(value);
  };

  
  // const handleStartDateChange = (date) => {
  //   // Update the state with the selected date
  //   setStartDate(date);
  //   // Extract the time from the selected date
  //   const selectedTime = date.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  //   console.log("Selected Time:", selectedTime);
  // };
  return (
    <>
      <section className="bg-orange-50 min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl  px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="" className="space-y-4">
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
                    id="name"
                  />
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
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="category1">Confrence</option>
                    <option value="category2">Wedding</option>
                    <option value="category3">Reception</option>
                    <option value="category3">Concert</option>
                    <option value="category3">Other</option>
                    {/* Add more options as needed */}
                  </select>
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
                    type="email"
                    id="email"
                  />
                </div>
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      Venue Type.
                    </span>
                  </div>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    id="eventCategory"
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="category1">Outdoor</option>
                    <option value="category2">Indoor</option>
                    <option value="category3">Banquet hall</option>
                    <option value="category3">Garden</option>
                    <option value="category3">Other</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div>
                <div className="label">
                  <span className="label-text text-base font-semibold">
                    Venue Location.
                  </span>
                </div>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Type here"
                  type="text"
                  id="loacation"
                />
              </div>

              {/* change to muix compoent */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="label">
                    <span className="label-text text-base font-semibold">
                      From Date.
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">From:</span>
                    <ReactDatePicker
                      placeholderText="Select"
                      showTimeSelect
                      selected={startDate}
                      onChange={(date) => handleDateChange(date, "start")}
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeClassName={handleColor}
                      className="md:w-96 rounded-lg border-gray-200 p-3 text-sm"
                    />
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
                    <ReactDatePicker
                    placeholderText="Select"
                      showTimeSelect
                      selected={endDate}
                      onChange={(date) => handleDateChange(date, "end")}
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeClassName={handleColor}
                      className="md:w-96 w-full rounded-lg border-gray-200 p-3 text-sm"
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
                    id="no:of Guests" 
                  />
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
                        checked={guestRequirement === "yes"}
                        onChange={() => handleRadioChange("yes")}
                      />
                      <span className="ml-2">Yes</span>
                    </label>

                    <label htmlFor="no">
                      <input
                        type="radio"
                        id="no"
                        name="guestRequirement"
                        value="no"
                        checked={guestRequirement === "no"}
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
                        checked={guestRequirement === "maybe"}
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
                        checked={guestRequirement === "notAtAll"}
                        onChange={() => handleRadioChange("notAtAll")}
                      />
                      <span className="ml-2">Not at all</span>
                    </label>
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
                        checked={cateringNeeds === "yes"}
                        onChange={handleCateringNeedsChange}
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
                        checked={cateringNeeds === "no"}
                        onChange={handleCateringNeedsChange}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                {cateringNeeds === "yes" && (
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
                    />
                  </div>
                )}
              </div>

              {/* <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <input
                    className="peer sr-only"
                    id="option1"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                  />
                  <label
                    htmlFor="option1"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> Option 1 </span>
                  </label>
                </div>
                <div>
                  <input
                    className="peer sr-only"
                    id="option2"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                  />
                  <label
                    htmlFor="option2"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> Option 2 </span>
                  </label>
                </div>
                <div>
                  <input
                    className="peer sr-only"
                    id="option3"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                  />
                  <label
                    htmlFor="option3"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> Option 3 </span>
                  </label>
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  rows="8"
                  id="message"
                ></textarea>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Send Enquiry
                </button>
              </div>
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                    id="email"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Phone Number"
                    type="tel"
                    id="phone"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <input
                    className="peer sr-only"
                    id="option1"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                  />
                  <label
                    htmlFor="option1"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> Option 1 </span>
                  </label>
                </div>
                <div>
                  <input
                    className="peer sr-only"
                    id="option2"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                  />
                  <label
                    htmlFor="option2"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> Option 2 </span>
                  </label>
                </div>
                <div>
                  <input
                    className="peer sr-only"
                    id="option3"
                    type="radio"
                    tabIndex="-1"
                    name="option"
                  />
                  <label
                    htmlFor="option3"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex="0"
                  >
                    <span className="text-sm"> Option 3 </span>
                  </label>
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  rows="8"
                  id="message"
                ></textarea>
              </div> */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Submit Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default TestTailwind;
