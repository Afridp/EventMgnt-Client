/* eslint-disable react/prop-types */
import { useState } from "react";

function PaymentForm({ handlePrev }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <section className="min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-2xl border my-10 lg:col-span-3 lg:p-12 fade-ef">
            <form action="" className="space-y-4">
              <span className="flex items-center mb-10">
                <span className="pr-6 font-bold font-mono text-orange-900">
                  Paymant Details
                </span>
                <span className="h-px flex-1 bg-black"></span>
              </span>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div>
                    <a
                      className={`w-full flex gap-3 cursor-pointer text-white font-semibold px-7 py-3 rounded-full border border-gra duration-200 ${
                        selectedOption === "Pay Later"
                          ? "bg-gradient-to-r from-gray-900 to-gray-800 hover:text-gray-50 hover:border-gray-800"
                          : "bg-gradient-to-r from-gray-300 to-gray-500 hover:scale-105 hover:from-black hover:to-gray-900 hover:text-gray-50 hover:border-gray-800"
                      }`}
                      onClick={() => handleButtonClick("Pay Later")}
                    >
                      Pay Later
                    </a>
                  </div>
                </div>

                <div>
                  <div>
                    <a
                      className={`w-full flex gap-3 cursor-pointer text-white font-semibold px-7 py-3 rounded-full border border-gra duration-200 ${
                        selectedOption === "Pay Now"
                          ? "bg-gradient-to-r from-gray-900 to-gray-800 hover:text-gray-50 hover:border-gray-800"
                          : "bg-gradient-to-r from-gray-300 to-gray-500 hover:scale-105 hover:from-black hover:to-gray-900 hover:text-gray-50 hover:border-gray-800"
                      }`}
                      onClick={() => handleButtonClick("Pay Now")}
                    >
                      Pay Now
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <div className="label">
                  <span className="label-text text-base font-semibold">
                    Enter Amount You Wish to Pay.
                  </span>
                </div>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Enter Amount"
                  type="number"
                  id="amount"
                />
                <div className="label"></div>
              </div>

              <div className="mt-5 flex gap-3 justify-end">
                <div
                  type="btn"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto cursor-pointer"
                  onClick={handlePrev}
                >
                  {isLoading ? "Loading.." : "Back"}
                </div>

                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium  text-white  sm:w-auto "
                >
                  {isLoading ? "Loading.." : "Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentForm;
