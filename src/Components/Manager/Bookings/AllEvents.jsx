import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBookedEvents } from "../../../Api/manager";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";
import DataNotFoundManager from "../../../Pages/ErrorPages/DataNotFoundManager";

// import SubModal from "./SubModal";

function AllEvents() {
  // const { manager } = useSelector((state) => state.managerSlice);

  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showSubModal, setShowSubModal] = useState(false);
  const fetchAllBookedEvevts = async () => {
    try {
      const res = await getBookedEvents();
      setBookedEvents(res?.data?.bookings);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllBookedEvevts();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header buttons */}
        <div className="flex justify-end mb-8 space-x-4">
          <Link
            to="/myEvents"
            className="px-4 py-2 bg-brown-900 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors duration-300"
          >
            My Events
          </Link>
          <Link
            to="/newBookings"
            className="px-4 py-2 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-900 transition-colors duration-300"
          >
            Enquiry
          </Link>
        </div>

        {loading ? (
          <LoaderManager loading={loading} />
        ) : (
          <>
            {bookedEvents?.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {bookedEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300"
                  >
                    <img
                      src={event.eventId.eventImage}
                      alt={event.eventId.eventName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">
                        {event.eventId.eventName}
                      </h2>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <svg
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.6"
                            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Zm3-7h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Zm-8 4h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Z"
                          />
                        </svg>
                        <div>
                          <p>
                            From:{" "}
                            {new Date(event.formData.Date.startDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                          <p>
                            To:{" "}
                            {new Date(event.formData.Date.endDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/manager/events/seemore/${event._id}`}
                        className="block w-full text-center py-2 bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-300"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <DataNotFoundManager />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AllEvents;
