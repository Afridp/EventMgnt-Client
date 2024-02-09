import { useEffect, useState } from "react";

import { getTodaysEvents, getUpcomingEvents } from "../../Api/manager";
import TrialModal from "./TrialModal";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Dashboard() {
  const { manager } = useSelector((state) => state.managerSlice);

  const [todaysEvents, setTodaysEvent] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodaysUpcomingEvents = async () => {
    try {
      setLoading(true);
      const res = await getTodaysEvents();
      setTodaysEvent(res?.data?.todaysEvents);
      const resp = await getUpcomingEvents();
      setUpcomingEvents(resp?.data?.upcomingEvents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysUpcomingEvents();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <div className="mt-16  top-0 z-[-2] h-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          { ! manager?.subscribed && <TrialModal managerId={manager._id} /> }
          

          <div className="carousel-container">
            <h2 className="text-center py-10 font-sans">TODAYS EVENTS</h2>

            <div className="carousel carousel-end rounded-box px-10">
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event) => (
                  <div key={event._id} className="carousel-item mr-4">
                    <img
                      src={
                        event?.themeImage ??
                        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                      alt="Drink"
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <p>No events available</p>
                </div>
              )}
            </div>
          </div>

          <div className="carousel-container px-10">
            <h2 className="text-center py-10 font-sans">UPCOMING EVENTS</h2>
            <div className="carousel carousel-end rounded-box px-10">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event._id} className="carousel-item mr-4">
                    <img
                      src={
                        event?.themeImage ??
                        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                      alt="Drink"
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <p>No events available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
