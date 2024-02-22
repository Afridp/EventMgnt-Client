import { useEffect, useState } from "react";

import { getEvents, listAndUnlist } from "../../Api/manager";
import { toast } from "react-toastify";
import LoaderManager from "../../Pages/ErrorPages/LoaderManager";

import MyEventsTab from "./MyEventsTab";
import AddEventTab from "./AddEventTab";
import { useSelector } from "react-redux";

function MyEventListAndAddEvent() {
  const { manager } = useSelector((state) => state.managerSlice);

  const [tab, setTab] = useState("tab1");
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents({ managerUUID: manager.uuid });
      setEvents(res?.data?.event);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleListing = async (eventId) => {
    try {
      setLoading(true);
      const res = await listAndUnlist(eventId);
      const updatedEvents = events.map((event) => {
        if (event._id === eventId) {
          return {
            ...event,
            list: res.data.listValue,
          };
        }
        return event;
      });
      setEvents(updatedEvents);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="items-center px-8 mx-auto max-w-7xl lg:px-7 md:px-12">
          <div className="justify-center w-full lg:pt-10 max-auto">
            <div>
              <ul className="grid grid-cols-2 mx-auto text-sm text-center text-black border-b">
                <li className="w-full -mb-px">
                  <button
                    onClick={() => setTab("tab1")}
                    className={`inline-block py-2 font-medium border-b-2 px-6 w-full  ${
                      tab === "tab1"
                        ? "bg-white text-blue-500 border-blue-500 border-b-2 font-semibold "
                        : ""
                    }`}
                  >
                    My Events
                  </button>
                </li>
                <li className="w-full -mb-px">
                  <button
                    onClick={() => setTab("tab2")}
                    className={`inline-block py-2 font-medium border-b-2 px-6 w-full  ${
                      tab === "tab2"
                        ? "bg-white text-blue-500 border-blue-500 border-b-2 font-semibold"
                        : ""
                    }`}
                  >
                    Add Event
                  </button>
                </li>
              </ul>
              {Loading ? (
                <LoaderManager loading={Loading} />
              ) : (
                <div className="py-4 pt-4 text-left bg-white content">
                  {tab === "tab1" && (
                    <MyEventsTab
                      events={events}
                      handleListing={handleListing}
                    />
                  )}
                  {tab === "tab2" && (
                    <AddEventTab
                      setEvents={setEvents}
                      setLoading={setLoading}
                      editingEvent={editingEvent}
                      setEditingEvent={setEditingEvent}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyEventListAndAddEvent;
