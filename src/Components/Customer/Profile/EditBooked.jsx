import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editBooked, getEditingEvent } from "../../../Api/customer";

function EditBooked() {
  const { bookingId } = useParams();
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEditingEventData = async () => {
      try {
        setIsLoading(true);
        const res = await getEditingEvent(bookingId);
        setEventData(res?.data?.event);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };

    fetchEditingEventData();
  }, [bookingId]);

  
 

  
  if (isLoading) {
    return (
      <div className="grid h-screen place-content-center bg-white">
        <div className="flex flex-row gap-2 ">
          <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-orange-900 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl  px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-2xl border my-20  lg:col-span-3 lg:p-12">
          <form action="" className="space-y-4" onSubmit={handleSubmit}>
                <span className="flex items-center">
                  <span className="pr-6 font-bold font-mono text-orange-900">
                    Event Details
                  </span>
                  <span className="h-px flex-1 bg-black"></span>
                </span>
{/*               
                {eventData?.map((field, index) => (
                  

                    
                ))} */}
                
              </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditBooked;
