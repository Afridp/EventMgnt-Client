/* eslint-disable react/prop-types */
import { useState } from "react";

function PaymentForm({ handlePrev, handleBook }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isAmountInputDisabled, setIsAmountInputDisabled] = useState(false);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    if (option === "Pay Later") {
      setIsAmountInputDisabled(true);
      setAmount("");
      setAmountError("");
    } else {
      setIsAmountInputDisabled(false);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handleAmountBlur = () => {
    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
      setAmountError("Please enter a valid amount.");
    }
  };

  return (
    <>
      <section className="min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-2xl border my-20 lg:col-span-3 lg:p-12 fade-ef">
            <form action="" className="space-y-4">
              <span className="flex items-center mb-10">
                <span className="pr-6 font-bold font-mono text-orange-900">
                  Payment Details
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
                      Pay By Wallet
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
                      Pay By Stripe
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
                  placeholder="₹"
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  onBlur={handleAmountBlur}
                  disabled={isAmountInputDisabled}
                />
                <div className="label">
                  {amountError && <a className="text-red-500">{amountError}</a>}
                </div>
              </div>

              <div className="mt-5 flex gap-3 justify-end">
                <div
                  type="btn"
                  className="inline-block w-full bg-black px-5 py-3 font-medium text-white sm:w-auto cursor-pointer"
                  onClick={handlePrev}
                >
                  Back
                </div>

                <button
                  type="btn"
                  className="inline-block w-full  bg-black hover:bg-red-900 px-5 py-3 font-medium text-white sm:w-auto"
                  onClick={(e) => handleBook(e, amount, selectedOption)}
                  // disabled={isAmountInputDisabled || amountError !== "" || selectedOption === ""}
                >
                  Pay
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
