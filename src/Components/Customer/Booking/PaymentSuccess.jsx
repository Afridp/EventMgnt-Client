import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { submitEvent } from "../../../Api/customer";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const { customer } = useSelector((state) => state.customerSlice);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const message = queryParams?.get('message')
  const amount = queryParams.get("amount");
  const eventId = queryParams.get("eventId");
  const personalValues = JSON.parse(
    decodeURIComponent(queryParams.get("personalValues"))
  );
  const formValues = JSON.parse(
    decodeURIComponent(queryParams.get("formValues"))
  );

  useEffect(() => {
    if (customer._id && !message) {
      saveBooking();
      setLoading(true);
    }
  }, []);

  const saveBooking = async () => {
    try {
      const res = await submitEvent(
        { formValues, personalValues, amount },
        customer._id,
        eventId
      );
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  
  return (
    <>
      <div className="mt-20">
        <div className="bg-blac p-6  md:mx-auto">
          {loading ? (
            <div className="w-16 h-16 mx-auto my-6 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          )}
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              {loading ? "Verifying" : "Payment Success.!"}
            </h3>
            <p className="text-gray-600 my-2">
              {message ?? "Thank you for completing your secure online payment."}
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 bg-black hover:bg-red-900 text-white font-semibold py-3"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
