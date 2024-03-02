/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { cancelEvent, fetchBookings } from "../../../Api/customer";
import { useSelector } from "react-redux";
import { useState } from "react";
import DataNotFound from "../../../Pages/ErrorPages/DataNotFound";
import { Link } from "react-router-dom";
import CancelModal from "./BookingCancelModal";
import { toast } from "react-toastify";
import Pagination from "../Common/Pagination";
import SearchAndSort from "../Common/SearchAndSort";
import useDebounce from "../../../CustomHooks/useDebounce";

function Bookings() {
  const { customer } = useSelector((state) => state.customerSlice);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOptions, setSortOptions] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [bookingsPerPage] = useState(5);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    getBookings();
  }, [debouncedSearchQuery, sortOptions]);
  const getBookings = async () => {
    try {
      setLoading(true);
      const res = await fetchBookings({
        customerId: customer._id,
        search: debouncedSearchQuery,
        sort: sortOptions,
      });

      setBookings(res?.data?.bookings);

      setCurrentPage(1);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 10);
    }
  };

  const handleCancelBooking = async (eventId) => {
    try {
      setLoading(true);
      const res = await cancelEvent(eventId);

      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      await fetchBookings(customer._id);
    } finally {
      setLoading(false);
    }
  };

  let currentBookings = null;
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;

  if (bookings?.length) {
    currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  }

  const paginate = (number) => setCurrentPage(number);

  return (
    <>
      <div className="my-32 container mx-auto">
        <SearchAndSort
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          forPage={"bookings"}
        />
        {loading ? (
          <div className="grid h-screen place-content-center bg-white">
            <div className="flex flex-row gap-2 ">
              <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        ) : currentBookings && currentBookings.length > 0 ? (
          <div>
            {/* Display current bookings */}
            {currentBookings.map((event) => (
              <div className="fade-ef" key={event._id}>
                <div className="border p-4 border-gray-300 rounded-sm m-4">
                  <div className="flow-root rounded-lg py-3 shadow-sm">
                    <div>{event.eventId.eventName}</div>
                    <div className="container mx-auto m-4 flex items-end justify-end gap-5">
                      <CancelModal
                        onConfirm={handleCancelBooking}
                        eventId={event._id}
                      />
                      <Link
                        to={`/myEvents/seemore/${event._id}`}
                        className="inline-block mt-4 rounded border border-indigo-600 bg-indigo-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                      >
                        See More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-14">
              <Pagination
                datasPerPage={bookingsPerPage}
                totalData={bookings.length}
                paginate={paginate}
              />
            </div>
          </div>
        ) : (
          <div className="container mx-auto py-24 flex items-center justify-center ">
            <div className="grid h-auto place-content-center bg-white">
              <DataNotFound />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;
