import { useState } from "react";
import BookingForm from "./BookingForm";
import PersonalInfoForm from "./PersonalInfoForm";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { stripePaymentApi, submitEvent } from "../../../Api/customer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const STRIPE_KEY = import.meta.env.VITE_APP_STRIPE_KEY;

// eslint-disable-next-line react/prop-types
function Booking() {
  const mid = localStorage.getItem("mid");
  const { customer } = useSelector((state) => state.customerSlice);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [personalDetails, setPersonalDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [personalValues, setPersonalValues] = useState({});

  const handleNext = () => {
    if (personalDetails) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(2);
    }
  };

  const handlePrev = () => {
    if (personalDetails) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(0);
    }
  };

  const handleBook = async (e, amt, paymentType) => {
    try {
      e.preventDefault();
      if (paymentType === "") {
        alert("select payment types");
        return;
      }
      if (paymentType === "PayNow") {
       
        const stripe = await loadStripe(STRIPE_KEY);
        const res = await stripePaymentApi(
          formValues,
          personalValues,
          eventId,
          amt
        );
        const sessionId = res.data.sessionId;
        const result = stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (result.error) {
          console.log((await result).error);
        }
      } else if (paymentType === "PayByWallet") {
        const res = await submitEvent(
          { formValues, personalValues, amount: amt, walletMode: true },
          customer._id,
          eventId
        );
        const queryParams = new URLSearchParams();
        queryParams.append(
          "message",
          "Thank you for completing your wallet balance to payment."
        );
        // queryParams.append('param2', 'value2');

        navigate(`/${mid}/payment?${queryParams.toString()}`);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="px-80 pt-28">
        <h2 className="sr-only">Steps</h2>

        <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
          <ol
            className={
              personalDetails
                ? "grid grid-cols-3 text-sm font-medium text-gray-500"
                : "grid grid-cols-2 text-sm font-medium text-gray-500"
            }
          >
            <li
              className={`relative flex justify-start font-semibold ${
                currentStep >= 1 ? "text-red-800" : "text-gray-400"
              }`}
            >
              <span
                className={
                  currentStep >= 1
                    ? "absolute -bottom-[1.75rem] start-0 rounded-full bg-red-800 text-white"
                    : "absolute -bottom-[1.75rem] start-0 rounded-full bg-gray-400 text-white"
                }
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <span className="hidden sm:block">Event Details </span>

              <svg
                className="size-6 sm:hidden"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </li>

            {personalDetails && (
              <li
                className={`relative flex justify-center font-semibold ${
                  currentStep >= 2 ? "text-red-800" : "text-gray-400"
                }`}
              >
                <span
                  className={
                    currentStep >= 2
                      ? "absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-red-800 text-white"
                      : "absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-gray-400 text-white"
                  }
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <span className="hidden sm:block"> Personal Details </span>

                <svg
                  className="mx-auto size-6 sm:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </li>
            )}

            <li
              className={`relative flex justify-end font-semibold ${
                currentStep >= 3 ? "text-red-800" : "text-gray-400"
              }`}
            >
              <span
                className={
                  currentStep >= 3
                    ? "absolute -bottom-[1.75rem] end-0 rounded-full bg-red-800 text-white"
                    : "absolute -bottom-[1.75rem] end-0 rounded-full bg-gray-400 text-white"
                }
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <span className="hidden sm:block"> Payment </span>

              <svg
                className="size-6 sm:hidden"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </li>
          </ol>
        </div>
      </div>

      {currentStep === 0 && (
        <BookingForm
          formValues={formValues}
          setFormValues={setFormValues}
          handleNext={handleNext}
          loading={loading}
          setLoading={setLoading}
          setPersonalDetails={setPersonalDetails}
        />
      )}
      {currentStep === 1 && (
        <PersonalInfoForm
          setPersonalValues={setPersonalValues}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
      {currentStep === 2 && (
        <PaymentForm
          handlePrev={handlePrev}
          handleBook={handleBook}
          formValues={formValues}
        />
      )}
    </>
  );
}

export default Booking;
