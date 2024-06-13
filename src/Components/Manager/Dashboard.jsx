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
          <div className="carousel-container px-10">
            <h2 className="text-center py-10 font-sans">TODAYS EVENTS</h2>
            <div className="carousel carousel-end rounded-box px-1 ">
              {todaysEvents?.length > 0 ? (
                todaysEvents.map((event) => (
                  <div key={event._id} className="carousel-item mr-4">
                    <div>
                      <img
                        
                        src={
                          event?.event.eventImage ??
                          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                        }
                        alt="Event"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <div className="py-20">
                    <DataNotFoundManager />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="carousel-container px-10">
            <h2 className="text-center py-10 font-sans">UPCOMING EVENTS</h2>
            <div className="carousel carousel-end rounded-box px-1">
              {upcomingEvents?.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event._id} className="carousel-item mr-4">
                    <div>
                      <img
                        className=""
                        src={
                          event?.eventId.eventImage ??
                          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                        }
                        alt="Event"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <div className="py-20">
                    <DataNotFoundManager />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
        // </div>
      )}
    </>
  );
}

export default Dashboard;
