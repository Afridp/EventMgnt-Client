import { useEffect, useState } from "react";
import { getNewBookings } from "../../Api/manager";
import DataNotFoundManager from "../../Pages/ErrorPages/DataNotFoundManager";

function NewBookingsTable() {
  const [newBookings, setNewBookings] = useState([]);

  const fetchNewBookings = async () => {
    try {
      const res = await getNewBookings();
      setNewBookings(res.data.newBookings);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchNewBookings();
  }, []);
  return (
    <>
      <div className="borer border-blak mx-20">
        <div className="mx-auto  max-w-screen px-4 py-8 sm:px-8">
          <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-gray-50/50 text-left text-xs font-semibold uppercase tracking-widest">
                    {/* <th className="px-5 py-3">image</th> */}
                    <th className="px-5 py-3">Booked By</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Location</th>
                    
                    <th className="px-5 py-3">See More</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {newBookings.length > 0 ? (
                    newBookings.map(
                      ({
                        // themeImage,
                        name,
                        eventCategory,
                        startDate,
                        venueLocation,
                      }) => (
                        <tr key={name}>
                          {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center">
                              <div className="h-20 w-20 flex-shrink-0">
                                <img
                                  className="h-full w-full rounded"
                                  src={
                                    themeImage ??
                                    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="whitespace-no-wrap"></p>
                              </div>
                            </div>
                          </td> */}
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">
                              {/* {new Date(book.date).toLocaleDateString("en-GB")} */}
                              {name}
                            </p>
                            {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">
                            
                          </p>
                        </td> */}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">
                              {/* {new Date(book.BookedFor).toLocaleDateString("en-GB")} */}
                              {/* {event.name} */}
                              {eventCategory}
                            </p>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">
                              {new Date(startDate).toLocaleDateString("en-GB")}
                              {/* {startDate} */}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">
                              {/* {new Date(book.BookedFor).toLocaleDateString("en-GB")} */}
                              {venueLocation}
                            </p>
                          </td>

                          {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      {new Date(book.cancelExp) < now ? (
                        <>
                          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                            In Use
                          </span>
                        </>
                      ) : (
                        <>
                          {book.isCancelled ? (
                            <>
                              <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-green-900">
                                Cancelled
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                className="rounded-full bg-red-200 cursor-pointer px-3 py-1 text-xs font-semibold text-green-900"
                                
                              >
                                Cancel
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </td> */}
                          <td className="whitespace-nowrap px-4 py-2">
                            <a
                              href="#"
                              className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <div className="my-8">
                          <DataNotFoundManager />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewBookingsTable;
