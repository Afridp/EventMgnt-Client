import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../Api/customer";
import DataNotFound from "../../Pages/ErrorPages/DataNotFound";

import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

function Event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await fetchEvents();
      setEvents(res.data.events);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, []);

  let currentEvents = null;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  if (events?.length > 10) {
    currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  } else {
    currentEvents = events;
  }
  const paginate = (number) => setCurrentPage(number);

  const 
  return (
    <>
      {loading ? (
        <div className="grid h-screen place-content-center bg-white">
          <div className="flex flex-row gap-2 ">
            <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      ) : (
        <div>
          {events ? (
            <div className="container min-h-screen  mx-auto my-32 ">
              <SearchBar onSearch={}/>
              {currentEvents.map((event, index) => (
                <div key={event.id}>
                  <div
                    className={
                      event.id % 2 !== 0
                        ? "p-2 dark:bg-gray-800 shadow-lg border-slate-800 border relative lg:flex lg:items-center lg:justify-center md:w-3/4 sm:w-full my-4 mx-auto rounded-g"
                        : "p-2 dark:bg-gray-800 shadow-lg border-slate-800 border relative lg:flex lg:items-center lg:justify-center md:w-3/4 sm:w-full my-4 mx-auto rounded-g"
                    }
                  >
                    {index % 2 === 0 && (
                      <div className="gap-4 p-4 lg:p-12">
                        <img
                          src={event?.eventImage}
                          className="w-200px h-40 rounded-lg"
                          alt="Tree"
                        />
                      </div>
                    )}
                    <div className="w-full py-6 sm:py-4 lg:py-8 px-4 z-20">
                      <h2 className="text-xl font-extrabold text-black dark:text-white sm:text-2xl">
                        <span className="block">{event.title}</span>
                      </h2>
                      <p className="text-sm mt-2">{event.eventDescription}</p>
                      <div className="lg:mt-0 lg:flex-shrink-0">
                        <div className="mt-6 inline-flex rounded-md shadow">
                          <Link
                            to="/events/book"
                            className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
      before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                          >
                            Create
                          </Link>
                        </div>
                      </div>
                    </div>
                    {!(index % 2 === 0) && (
                      <div className="gap-4 p-4 lg:p-12">
                        <img
                          // src={event?.eventImage}
                          className="w-200px h-40 rounded-lg"
                          alt="Tree"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="mt-14">
                <Pagination
                  datasPerPage={eventsPerPage}
                  totalData={events.length}
                  paginate={paginate}
                />
              </div>
            </div>
          ) : (
            <div className="container mx-auto flex items-center justify-center ">
              <div className="grid h-screen place-content-center bg-white">
                <DataNotFound />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Event;
