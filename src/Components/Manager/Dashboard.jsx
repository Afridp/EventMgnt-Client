/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { getTodaysEvents, getUpcomingEvents } from "../../Api/manager";

// import { useSelector } from "react-redux";
import LoaderManager from "../../Pages/ErrorPages/LoaderManager";
import DataNotFoundManager from "../../Pages/ErrorPages/DataNotFoundManager";

function Dashboard() {
  // const { manager } = useSelector((state) => state.managerSlice);

  const [todaysEvents, setTodaysEvent] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodaysUpcomingEvents = async () => {
    try {
      const res = await getTodaysEvents();
      setTodaysEvent(res?.data?.todaysEvents);
      const resp = await getUpcomingEvents();
      setUpcomingEvents(resp?.data?.upcomingEvents);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTodaysUpcomingEvents();
  }, []);

  return (
    <>
      {/* {manager.isTrailed && !manager.subscribed && (
        <TrialModal showTrail={false} managerId={manager._id} />
      )}
      {!manager.isTrailed && (
        <TrialModal showTrail={true} managerId={manager._id} />
      )} */}
      {loading ? (
        <LoaderManager loading={loading} />
      ) : (
        // <div className="top-0 z-[-2] h-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <>
          <div className="bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Today's Events Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                  Today's Events
                </h2>
                {todaysEvents?.length > 0 ? (
                  <div
                    className="overflow-x-auto scrollbar-none"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    <div
                      className="flex space-x-4 pb-4"
                      style={{ width: "max-content" }}
                    >
                      {todaysEvents.map((event) => (
                        <div key={event._id} className="w-64 flex-shrink-0">
                          <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                              className="w-full h-48 object-cover"
                              src={
                                event?.event.eventImage ||
                                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                              }
                              alt="Event"
                            />
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {event.event.eventName}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-3">
                                {event.event.eventDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="py-20">
                      <DataNotFoundManager />
                    </div>
                  </div>
                )}
              </div>

              {/* Upcoming Events Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                  Upcoming Events
                </h2>
                {upcomingEvents?.length > 0 ? (
                  <div
                    className="overflow-x-auto scrollbar-none"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    <div
                      className="flex space-x-4 pb-4"
                      style={{ width: "max-content" }}
                    >
                      {upcomingEvents.map((event) => (
                        <div key={event._id} className="w-64 flex-shrink-0">
                          <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                              className="w-full h-48 object-cover"
                              src={
                                event?.eventId.eventImage ||
                                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                              }
                              alt="Event"
                            />
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {event.eventId.eventName}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-3">
                                {event.eventId.eventDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="py-20">
                      <DataNotFoundManager />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
        // </div>
      )}
    </>
  );
}

export default Dashboard;
