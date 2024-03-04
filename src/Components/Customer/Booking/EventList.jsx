import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../../Api/customer";
import DataNotFound from "../../../Pages/ErrorPages/DataNotFound";

import Pagination from "../Common/Pagination";
import SearchAndSort from "../Common/SearchAndSort";
import useDebounce from "../../../CustomHooks/useDebounce";

function Event() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOptions, setSortOptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [eventsPerPage] = useState(5);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const res = await fetchEvents({
          search: debouncedSearchQuery,
          sort: sortOptions,
        });

        setEvents(res?.data?.events);
        setCurrentPage(1);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 10);
      }
    };
    getEvents();
  }, [debouncedSearchQuery, sortOptions]);

  let currentEvents = null;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  if (events?.length) {
    currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  }

  const paginate = (number) => setCurrentPage(number);

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
          <div className="container min-h-screen  mx-auto my-32 ">
            <SearchAndSort
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortOptions={sortOptions}
              setSortOptions={setSortOptions}
              forPage={"eventList"}
            />
            {currentEvents ? (
              <div>
                {currentEvents?.map((event, index) => (
                  <div className="fade-ef" key={event._id}>
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
                      <div className="w-full py-6 sm:py-4 lg:py-8 px-10 z-20">
                        <h2 className="text-xl font-extrabold text-black dark:text-white sm:text-2xl">
                          <span className="block">{event.eventName}</span>
                        </h2>
                        <p className="text-sm mt-2">{event.eventDescription}</p>
                        <div className="lg:mt-0 lg:flex-shrink-0">
                          <div className="mt-6 inline-flex rounded-md shadow">
                            <Link
                              to={`/events/book/${event._id}`}
                              className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
                                  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                            >
                              Book
                            </Link>
                          </div>
                        </div>
                      </div>
                      {!(index % 2 === 0) && (
                        <div className="gap-4 p-4 lg:p-12">
                          <img
                            src={event?.eventImage}
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
              <>
                <div className="container mx-auto py-24 flex items-center justify-center ">
                  <div className="grid h-auto place-content-center bg-white">
                    <DataNotFound />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Event;
