/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getWalletDetails } from "../../../Api/customer";
import { useSelector } from "react-redux";

function PaymentForm({ handlePrev, handleBook, formValues }) {
  const { customer } = useSelector((state) => state.customerSlice);
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  // const [isAmountInputDisabled, setIsAmountInputDisabled] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    fetchWalletBalance();
    calculateEstimation(formValues);
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const res = await getWalletDetails(customer._id);
      setBalance(res?.data?.balance);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateEstimation = (formValues) => {
    // Parse the dates
    let startDate =''
    let endDate=''
    if(formValues.Date){
       startDate = new Date(formValues.Date.startDate);
       endDate = new Date(formValues.Date.endDate);

       
       // Calculate the duration in milliseconds
       const durationMs = endDate.getTime() - startDate.getTime();
       
       // Convert duration to days (assuming each day has 24*60*60*1000 milliseconds)
       const durationDays = durationMs / (24 * 60 * 60 * 1000);
       
       // Example: Estimate based on a rate per day
       const ratePerDay = 15000; // Example rate per day
       const estimatedAmount = durationDays * ratePerDay;
       setDuration(durationDays);
       setEstimatedAmount(estimatedAmount);
      }
    // You can return the estimated amount or use it for further processing
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handleAmountBlur = () => {
    if (amount === "" || isNaN(amount) || Number(amount) < 0) {
      setAmountError("Please enter a valid amount.");
    }
  };

  return (
    <>
      <section className="min-h-screen bg-cover">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-2xl border my-20 lg:col-span-3 lg:p-12 fade-ef">
            <form action="" className="space-y-5">
              <span className="flex items-center mb-10">
                <span className="pr-6 font-bold font-mono text-orange-900">
                  Payment Details
                </span>
                <span className="h-px flex-1 bg-black"></span>
              </span>
              <div className="flex flex-col gap-1 text-black font-semibold">
                <h1>Duration : {duration} Days</h1>
                <h1>Estimated Amount : ₹{estimatedAmount}</h1>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <a
                    className={`w-full flex gap-3 cursor-pointer text-white font-semibold px-7 py-3 rounded-ful border border-gra duration-200 ${
                      selectedOption === "PayByWallet"
                        ? "bg-gradient-to-r from-gray-900 to-gray-800 hover:text-gray-50 hover:border-gray-800"
                        : "bg-gradient-to-r from-gray-300 to-gray-500 hover:scale-105 hover:from-black hover:to-gray-900 hover:text-gray-50 hover:border-gray-800"
                    }`}
                    onClick={() => handleButtonClick("PayByWallet")}
                    onMouseEnter={() => setShowBalance(true)}
                    onMouseLeave={() => setShowBalance(false)}
                  >
                    Pay By Wallet
                  </a>
                  {/* Wallet balance */}
                  {showBalance && (
                    <div className="absolute right-0 text-green-700 p-1 text-sm font-semibold ">
                      Wallet Balance: {balance}
                    </div>
                  )}
                </div>

                <div>
                  <a
                    className={`w-full flex gap-3 cursor-pointer text-white font-semibold px-7 py-3 rl border border-gra duration-200 ${
                      selectedOption === "PayNow"
                        ? "bg-gradient-to-r from-gray-900 to-gray-800 hover:text-gray-50 hover:border-gray-800"
                        : "bg-gradient-to-r from-gray-300 to-gray-500 hover:scale-105 hover:from-black hover:to-gray-900 hover:text-gray-50 hover:border-gray-800"
                    }`}
                    onClick={() => handleButtonClick("PayNow")}
                  >
                    Pay By Stripe
                  </a>
                </div>
              </div>

              <div>
                <div className="label">
                  <span className="label-text text-base font-semibold">
                    Enter Amount You Wish to Pay As Advance.
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
