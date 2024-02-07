import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBookedEvents } from "../../Api/manager";

function Events() {
  // const { manager } = useSelector((state) => state.managerSlice);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllBookedEvevts = async () => {
      try {
        const res = await getBookedEvents();
        setEvents(res?.data?.bookings);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllBookedEvevts();
  }, []);
  return (
    <>
      <div className="container mx-auto my-7 flex justify-end">
        <div className="w-[150px] h-[50px] ">
          <button className="w-[140px] h-[40px] shadow-2xl bg-sky-600 outline outline-offset-2 outline-1 outline-sky-600 hover:bg-black hover:outline-none hover:text-white duration-300 active:scale-[0.99]">
            <Link to="/manager/myEvents" className="font-bold" href="#">
              Add Event
            </Link>
          </button>
        </div>
        <div className="w-[150px] h-[50px] ">
          <button className="w-[140px] h-[40px] shadow-2xl bg-sky-600 outline outline-offset-2 outline-1 outline-sky-600 hover:bg-blue-800 hover:text-white hover:outline-none duration-300 active:scale-[0.99]">
            <a className="font-bold" href="#">
              Button
            </a>
          </button>
        </div>
      </div>{" "}
      <div className="container mx-auto  my-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <a
            key={event._id}
            href="#"
            className="block rounded-lg p-4 shadow-md border-gray-200 border shadow-gray-300"
          >
            <img
              alt="Home"
              src={
                event?.themeImage
                  ? event.themeImage
                  : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              }
              className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dd className="text-md text-gray-500">{event.eventCategory}</dd>
                </div>

                <div>
                  <dd className="font-medium">{event.venueLocation}</dd>
                </div>
              </dl>

              <div className="mt-6  gap-8 text-xs">
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <svg
                    className="svg-icon"
                    viewBox="0 0 20 20"
                    width="40"
                    height="40"
                  >
                    <path
                      fill="none"
                      d="M16.254,3.399h-0.695V3.052c0-0.576-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042v0.347H6.526V3.052c0-0.576-0.467-1.042-1.042-1.042S4.441,2.476,4.441,3.052v0.347H3.747c-0.768,0-1.39,0.622-1.39,1.39v11.813c0,0.768,0.622,1.39,1.39,1.39h12.507c0.768,0,1.391-0.622,1.391-1.39V4.789C17.645,4.021,17.021,3.399,16.254,3.399z M14.17,3.052c0-0.192,0.154-0.348,0.348-0.348c0.191,0,0.348,0.156,0.348,0.348v0.347H14.17V3.052z M5.136,3.052c0-0.192,0.156-0.348,0.348-0.348S5.831,2.86,5.831,3.052v0.347H5.136V3.052z M16.949,16.602c0,0.384-0.311,0.694-0.695,0.694H3.747c-0.384,0-0.695-0.311-0.695-0.694V7.568h13.897V16.602z M16.949,6.874H3.052V4.789c0-0.383,0.311-0.695,0.695-0.695h12.507c0.385,0,0.695,0.312,0.695,0.695V6.874z M5.484,11.737c0.576,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043s-1.042,0.467-1.042,1.043C4.441,11.271,4.908,11.737,5.484,11.737z M5.484,10.348c0.192,0,0.347,0.155,0.347,0.348c0,0.191-0.155,0.348-0.347,0.348s-0.348-0.156-0.348-0.348C5.136,10.503,5.292,10.348,5.484,10.348z M14.518,11.737c0.574,0,1.041-0.467,1.041-1.042c0-0.576-0.467-1.043-1.041-1.043c-0.576,0-1.043,0.467-1.043,1.043C13.475,11.271,13.941,11.737,14.518,11.737z M14.518,10.348c0.191,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.156-0.348-0.348C14.17,10.503,14.324,10.348,14.518,10.348z M14.518,15.212c0.574,0,1.041-0.467,1.041-1.043c0-0.575-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042C13.475,14.745,13.941,15.212,14.518,15.212z M14.518,13.822c0.191,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.155-0.348-0.348C14.17,13.978,14.324,13.822,14.518,13.822z M10,15.212c0.575,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042c-0.576,0-1.042,0.467-1.042,1.042C8.958,14.745,9.425,15.212,10,15.212z M10,13.822c0.192,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348s-0.348-0.155-0.348-0.348C9.653,13.978,9.809,13.822,10,13.822z M5.484,15.212c0.576,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042s-1.042,0.467-1.042,1.042C4.441,14.745,4.908,15.212,5.484,15.212z M5.484,13.822c0.192,0,0.347,0.155,0.347,0.347c0,0.192-0.155,0.348-0.347,0.348s-0.348-0.155-0.348-0.348C5.136,13.978,5.292,13.822,5.484,13.822z M10,11.737c0.575,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043c-0.576,0-1.042,0.467-1.042,1.043C8.958,11.271,9.425,11.737,10,11.737z M10,10.348c0.192,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348s-0.348-0.156-0.348-0.348C9.653,10.503,9.809,10.348,10,10.348z"
                    ></path>
                  </svg>

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 font-medium">From : {event.startDate}</p>

                    <p className="font-medium text-gray-500">To :{event.endDate}</p>
                  </div>
                </div>
                <div className="ml-28 mt-2 sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <Link to={`/manager/events/seemore/${event._id}`} className="w-[100px] bg-blue-gray-900 h-[40px] ml-14 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#78817c] before:to-[rgb(126,128,127)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                    See More
                  </Link>
                </div>


                
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default Events;
