import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventData } from "../../../Api/manager";

export const EventSeeMore = () => {
  const {eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [personalData, setPersonalData] = useState({})
  // const [open, setOpen] = useState(false);

  const fetchEventData = async () => {
    try {
      const res = await getEventData(eventId);
      setEventData(res?.data?.eventData);
      setPersonalData(res?.data?.personalData)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-screen bg-cover">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-2xl border my-10 lg:col-span-3 lg:p-12">
          <form action="" className="space-y-8">
            <span className="flex items-center">
              <span className="h-px flex-1  bg-black"></span>
              <span className="pr-6 ml-4 font-bold font-mono text-orange-900">
                Booked Event Details
              </span>
            </span>
            {Object.entries(eventData).map(([fieldName, fieldValue], index) => (
              <div key={index}>
                <label className="block font-semibold">{fieldName}</label>
                {Array.isArray(fieldValue) ? (
                  // Render checkboxes for array values
                  <div className="flex flex-row items-center gap-5 mt-3">
                    {fieldValue.map((value, idx) => (
                      <div key={idx} className="flex items-center">
                        <input
                          type="checkbox"
                          checked
                          id={`${fieldName}-${idx}`}
                          value={value}
                          // disabled
                          className="checkbox"
                        />
                        <label htmlFor={`${fieldName}-${idx}`} className="ml-3">
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : typeof fieldValue === "object" ? (
                  // Render radio buttons for object value
                  Object.entries(fieldValue).map(([, val], idx) => (
                    <div
                      key={idx}
                      className="flex flex-row items-center gap-5 mt-2"
                    >
                      <input
                        type="radio"
                        id={`${fieldName}-${idx}`}
                        value={val}
                        checked
                        // disabled
                        className="radio"
                      />
                      <label htmlFor={`${fieldName}-${idx}`}>{val}</label>
                    </div>
                  ))
                ) : (
                  // Render input for other types of values
                  <div className="mt-3">
                    <input
                      type="text"
                      value={fieldValue}
                      disabled
                      className="w-full rounded-lg border-gray-200 p-3 text-sm  "
                    />
                  </div>
                )}
              </div>
            ))}

            {personalData && (
              <>
                <span className="flex items-center">
                  <span className="h-px flex-1  bg-black"></span>
                  <span className="pr-6 ml-4 font-bold font-mono text-orange-900">
                    Personal Details
                  </span>
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
                      value={personalData.name}
                      disabled
                    />
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
                      value={personalData.email}
                      disabled
                    />
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
                      value={personalData.phoneNumber}
                      disabled
                    />
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
                      value={personalData.alternativePhoneNumber}
                      disabled
                    />
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
