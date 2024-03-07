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
      <div className="container mx-auto my-7 flex justify-center sm:justify-end ">
        <div className="w-[150px] h-[50px] ">
          <button className="w-[140px] h-[40px] shadow-2xl bg-sky-600 outline outline-offset-2 outline-1 outline-sky-600 bg-black hover:outline-none text-white duration-300 active:scale-[0.99]">
            <Link to="/manager/myEvents" className="font-bold" href="#">
              My Events
            </Link>
          </button>
        </div>
        <div className="w-[150px] h-[50px] ">
          <button className="w-[140px] h-[40px] shadow-2xl bg-sky-600 outline-offset-2 outline-1 outline-sky-600 bg-blue-800 text-white hover:outline-none duration-300 active:scale-[0.99]">
            <Link to={"/manager/newBookings"} className="font-bold">
              Enquiry
            </Link>
          </button>
        </div>
      </div>{" "}
      {/* {showSubModal && <SubModal />} */}
      {loading ? (
        <LoaderManager loading={loading} />
      ) : (
        <>
          <div className="container mx-auto my-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 fade-ef">
            {bookedEvents?.length > 0 ? (
              bookedEvents.map((event) => (
                <div
                  key={event._id}
                  className="max-w-xs mx-9 sm:mx-0 shadow-md bg bg-transparent text border transform transition-transform hover:scale-105"
                >
                  <img
                    src={event.eventId.eventImage}
                    alt=""
                    className="w-full h-64 object-cover rounded bg-gray-500"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">
                      {event.eventId.eventName}
                    </h2>
                    <div className="mt-2 gap-8 text-xs">
                      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
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
                            strokeWidth="1.6"
                            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Zm3-7h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Zm-8 4h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Z"
                          />
                        </svg>

                        <div className="mt-1.5 sm:mt-0">
                          <p className="text-gray-500 font-medium">
                            From:{" "}
                            {new Date(event.startDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                          <p className="font-medium text-gray-500">
                            To:{" "}
                            {new Date(event.endDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to={`/manager/events/seemore/${event._id}`}>
                    <a
                      type="button"
                      className="w-full pb-4 font-semibold bg-white text-gray-900 text-center cursor-pointer hover:text-blue-600"
                    >
                      Read more
                    </a>
                  </Link>
                </div>
              ))
            ) : (
              <>
                <div className="mt-64">
                  <DataNotFoundManager />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default AllEvents;
