// eslint-disable-next-line react/prop-types
import { Chip } from "@material-tailwind/react";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import FormBuilder from "./FormBuilder";
import { useState } from "react";

function MyEventsTab({ events, handleListing, fetchEvents }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventUUID, setEventUUID] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventId, setEventId] = useState("")

  const toggleModal = (eventUUID, eventId, eventName) => {
    setEventName(eventName);
    setEventUUID(eventUUID);
    setEventId(eventId)
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main>
      {isModalOpen && (
        <FormBuilder
          fetchEvents={fetchEvents}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          eventUUID={eventUUID}
          eventId={eventId}
          eventName={eventName}
        />
      )}
      {events?.map((event) => (
        <div key={event._id} className="py-2">
          <div className="h-auto border border-gray-200 border-dashed rounded-lg ">
            <div className="grid grid-cols-12 px-4 py-2">
              <div className="col-span-2">
                {/* Set a fixed size for the image */}
                <img
                  src={event?.eventImage}
                  alt="Event Image"
                  className="w-40 h-32 rounded-md object-cover"
                />
              </div>

              <div className="col-span-6 ">
                <h3 className="text-lg font-semibold mb-2">
                  {event.eventName}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {event.eventDescription}
                </p>
              </div>

              <button
                className="col-span-2 flex items-center justify-center"
                onClick={() => toggleModal(event.uuid, event._id, event.eventName)}
              >
                <Tooltip title="Form">
                  <a className="p-2 border text-white rounded-md">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="0.7"
                        d="M5 7h14M5 12h14M5 17h10"
                      />
                    </svg>
                  </a>
                </Tooltip>
              </button>

              <div className="col-span-1 flex justify-center items-center">
                <a
                  className="text-blue-500"
                  // onClick={() =>
                  //   editEvent({
                  //     eventName: event.eventName,
                  //     eventDescription: event.eventDescription,
                  //     image: event.eventImage,
                  //     uuid: event.uuid,
                  //   })
                  // }
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.7"
                      d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                    />
                  </svg>
                </a>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <Chip
                  variant="filled"
                  onClick={
                    // event.form != null ? "" :
                    () => handleListing(event._id)
                  }
                  size="sm"
                  value={event.list ? "unlist" : "list"}
                  color={event.list ? "red" : "green"}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

MyEventsTab.propTypes = {
  events: PropTypes.array,
  handleListing: PropTypes.func,
  fetchEvents: PropTypes.func,
};

export default MyEventsTab;
