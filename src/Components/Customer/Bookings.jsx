import { useEffect } from "react";
import { fetchBookings } from "../../Api/customer";
import { useSelector } from "react-redux";
import { useState } from "react";
import DataNotFound from "../../Pages/ErrorPages/DataNotFound";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Bookings() {
  const { customer } = useSelector((state) => state.customerSlice);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const message = location?.state?.message;

  useEffect(() => {
    const getBookings = async () => {
      try {
        if (message) {
          toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setLoading(true);
        const res = await fetchBookings(customer._id);
        setBookings(res?.data?.bookings);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    getBookings();
  }, []);

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
        <div className="container mb-20 mt-32 mx-auto">
          {bookings ? (
            bookings.map((event) => (
              <div key={event._id}>
                <div className="border p-4 border-black m-4">
                  <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                    <dl className="-my-5 divide-y divide-gray-100 text-sm">
                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-semibold text-gray-900">
                          Event Name
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {event.eventName}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-semibold text-gray-900">
                          Event Category
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {event.eventCategory}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-semibold text-gray-900">Venue</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {event.venueName}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-semibold text-gray-900">Date</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {event.startDate}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-semibold text-gray-900">
                          Additional Details
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {event.venueLocation}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className=" container mx-auto m-4 flex items-end justify-end">
                    <a
                      className="inline-block mt-4  rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                      href="#"
                    >
                      See More
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // <div className="container mx-auto flex items-center justify-center ">
            <div className="grid h-screen place-content-center bg-white">
              <DataNotFound />
              {/* </div> */}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Bookings;
