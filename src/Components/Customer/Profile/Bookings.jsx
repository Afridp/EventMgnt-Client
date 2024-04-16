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
  const [isOpen, setIsOpen] = useState(false);
  const [cancelEventId, setCancelEventId] = useState("");

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
      }, 1000);
    }
  };

  const toggleModal = (e, eventId) => {
    e.preventDefault();
    setCancelEventId(eventId);
    setIsOpen(!isOpen);
  };

  const handleCancelBooking = async () => {
    try {
      setLoading(true);

      const res = await cancelEvent(cancelEventId);

      const updatedBookings = bookings.filter((event) => {
        return event._id !== res?.data?.canceledEventId;
      });
      setBookings(updatedBookings);

      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsOpen(!isOpen);
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
      {isOpen && (
        <CancelModal
          onConfirm={handleCancelBooking}
          eventId={cancelEventId}
          toggleModal={toggleModal}
        />
      )} 
      <div className="my-20 container mx-auto">
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
        ) : (
          <div>
            {currentBookings && currentBookings.length > 0 ? (
              <div className="overflow-x-auto px-28 py-5 fade-ef">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Name & Date</th>
                      <th>Booked By</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookings.map((event) => (
                      <tr key={event._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squire w-12 h-12">
                                <img
                                  src={event.eventId.eventImage}
                                  alt="eventImage"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {event.eventId.eventName}
                              </div>
                              <div className="text-sm opacity-50">
                                {event.formData?.date ?? "nil"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {event.personalData?.name}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            {event.personalData?.phoneNumber}
                          </span>
                        </td>
                        <td>{event.paidAmount}</td>
                        <td
                          className="capitalize"
                          style={{ color: event.status ? "red" : "green" }}
                        >
                          {event.status ?? "Approved"}
                        </td>

                        <th>
                          <button className="btn btn-link btn-xs">
                            <Link to={`/myEvents/seemore/${event._id}`}>
                              View
                            </Link>
                          </button>
                        </th>
                        <th>
                          <button
                            onClick={(e) => toggleModal(e, event._id)}
                            className="btn btn-danger btn-xs hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        )}
      </div>
    </>
  );
}

export default Bookings;
