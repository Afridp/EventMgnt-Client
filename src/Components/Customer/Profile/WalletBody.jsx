import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWalletDetails,
  addBalance,
  walletTopupStripeApi,
} from "../../../Api/customer";
import Lottie from "react-lottie";
// import animationDataCross from "../../../Assets/Animations/Animation - cross.json";
import animationData from "../../../Assets/Animations/Animation - 1710241831168.json";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";
const STRIPE_KEY = import.meta.env.VITE_APP_STRIPE_KEY;

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function WalletBody() {
  const { customer } = useSelector((state) => state.customerSlice);
  const { amt, customerId, status } = useParams();
  const navigate = useNavigate();

  const [showTopUpFields, setShowTopUpFields] = useState(false);
  const [amount, setAmount] = useState("");
  const [indication, setIndication] = useState(false);
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (status === "success") {
      addToWallet(amt, customerId);
      setIndication(true);
      clearParams();
      setTimeout(() => {
        setIndication(false);
      }, 4000);
    }

    fetchWalletDetails();
  }, [status, amt, customerId]);

  const clearParams = () => {
    navigate("/wallet");
  };

  const addToWallet = async (amt, customerId) => {
    try {
      await addBalance({ amt, customerId });
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletDetails = async () => {
    try {
      const res = await getWalletDetails(customer._id);
      setBalance(res?.data?.balance);
      setTransactions(res?.data?.transactions);
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = () => {
    setShowTopUpFields(true);
  };

  const handleTopupWallet = async () => {
    try {
      const stripe = await loadStripe(STRIPE_KEY);
      const res = await walletTopupStripeApi({
        customerId: customer._id,
        amount,
      });
      const sessionId = res.data.sessionId;
      const result = stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        console.log((await result).error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <LoaderManager loading={loading} />
      <div className="p-20">
        <div className="container mx-auto h-full bord p-10">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="h-96 rounded-lg border shadow-3 flex flex-col items-center  justify-center space-y-10">
              {/* <div className="flex flex-col items-center  justify-center space-y-10 "> */}
              {indication ? (
                <div className="w-300 h-300 bg-transparent">
                  <Lottie
                    options={defaultOptions}
                    height={300}
                    width={300}
                    style={{ margin: "0 auto" }}
                  />
                </div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                    />
                  </svg>

                  <h1 className="font-mono text-xl font-bold">
                    BALANCE : ₹{`${balance ?? 0} `}
                  </h1>
                  <div className="space-x-3">
                    <button
                      onClick={handleTopup}
                      className="border px-4 py-1 bg-blue-900 text-white"
                    >
                      Top Up
                    </button>
                    <button disabled className="border px-4 py-1 bg-brown-50">
                      Withdraw
                    </button>
                  </div>
                </>
              )}
              {/* </div> */}

              <div>
                {showTopUpFields && (
                  <div className="pb ">
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="border-none px-3 py-1 "
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                      onClick={handleTopupWallet}
                      className="border px-4 py-1 bg-green-500 text-white"
                    >
                      Confirm Top Up
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="max-h-96 shadow-3 rounded-lg border lg:col-span-2 p-4 font-semibold overflow-auto">
              <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
                <h2 className="mb-3 text-2xl font-semibold leading-tight">
                  Transaction
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead className="rounded-t-lg dark:bg-gray-700">
                      <tr className="text-right">
                        <th title="Ranking" className="p-3 text-left">
                          #
                        </th>
                        <th title="Team name" className="p-3 text-left">
                          Transaction Id
                        </th>
                        <th title="Away games" className="p-3">
                          Time
                        </th>
                        <th title="Away games" className="p-3">
                          Date
                        </th>
                        <th title="Last 10 games" className="p-3">
                          Amount
                        </th>
                        <th title="Current streak" className="p-3">
                          Db/Cr
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions?.length > 0 ? (
                        transactions?.map(
                          (
                            { amount, transactionId, date, transactionType },
                            index
                          ) => (
                            <tr
                              key={transactionId}
                              className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800"
                            >
                              <td className="px-3 py-2 text-left">
                                <span>{index + 1}</span>
                              </td>
                              <td className="px-3 py-2 text-left">
                                <span>{transactionId}</span>
                              </td>
                              <td className="px-3 py-2">
                                <span>{new Date(date).toLocaleTimeString('en-IN')}</span>
                              </td>
                              <td className="px-3 py-2">
                                <span>{new Date(date).toLocaleDateString('en-IN')}</span>
                              </td>
                              <td className="px-3 py-2">
                                <span>₹ {amount}</span>
                              </td>
                              <td className={`px-3 py-2 ${transactionType === "Credit" ? "text-green-600" : "text-red-600" }`}>
                                <span>{transactionType}</span>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <div className="absolute mx-44 my-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 750 500"
                            className="mx-auto w-auto text-black sm:h-44"
                          >
                            <g id="freepik--background-complete--inject-5">
                              <rect
                                x="151.54"
                                y="143.03"
                                width="134.99"
                                height="198.77"
                                transform="translate(-97.8 162.69) rotate(-33.78)"
                                style={{ fill: "#f5f5f5" }}
                              />
                              <polygon
                                points="272.42 279.66 271.15 287.54 215.37 279.5 216.64 271.62 272.42 279.66"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <polygon
                                points="244.33 251.55 252.33 252.7 243.46 307.62 235.45 306.46 244.33 251.55"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M193,181.75c.08.11-11.16,7.78-25.11,17.1s-25.32,16.8-25.4,16.68,11.16-7.78,25.11-17.11S192.87,181.63,193,181.75Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M234.22,171.39c.08.12-18.62,12.76-41.76,28.24s-42,27.93-42.06,27.82S169,214.68,192.17,199.2,234.14,171.27,234.22,171.39Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M242.49,183.75c.08.12-18.62,12.77-41.76,28.25s-42,27.93-42.06,27.81,18.62-12.76,41.77-28.25S242.41,183.63,242.49,183.75Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M250.76,196.12c.08.12-18.62,12.77-41.76,28.24S167,252.3,167,252.18s18.61-12.77,41.76-28.25S250.68,196,250.76,196.12Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M259,208.49c.08.12-18.62,12.76-41.76,28.24s-42,27.93-42.05,27.81S193.83,251.78,217,236.3,259,208.37,259,208.49Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <rect
                                x="537.68"
                                y="250.43"
                                width="113.37"
                                height="166.93"
                                transform="translate(-85.31 386.8) rotate(-33.78)"
                                style={{ fill: "#f5f5f5" }}
                              />
                              <polygon
                                points="639.2 365.18 638.13 371.8 591.28 365.05 592.36 358.43 639.2 365.18"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <polygon
                                points="615.61 341.57 622.33 342.54 614.88 388.66 608.15 387.69 615.61 341.57"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M572.46,283c.08.12-9.35,6.57-21.07,14.4s-21.28,14.09-21.36,14,9.36-6.56,21.07-14.4S572.38,282.83,572.46,283Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M607.11,274.25c.08.12-15.61,10.76-35,23.75s-35.26,23.45-35.34,23.33,15.61-10.76,35-23.76S607,274.13,607.11,274.25Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M614.06,284.63c.08.12-15.61,10.76-35,23.76s-35.26,23.44-35.34,23.32S559.28,321,578.72,308,614,284.52,614.06,284.63Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M621,295c.08.12-15.62,10.76-35,23.76s-35.26,23.44-35.34,23.32,15.61-10.75,35-23.76S620.93,294.9,621,295Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M628,305.41c.08.12-15.61,10.75-35,23.75s-35.26,23.44-35.34,23.33,15.61-10.76,35-23.76S627.87,305.29,628,305.41Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <rect
                                x="295.8"
                                y="90.69"
                                width="116.6"
                                height="171.69"
                                transform="translate(125.11 -146.13) rotate(28.14)"
                                style={{ fill: "#f5f5f5" }}
                              />
                              <polygon
                                points="347.42 232.37 340.9 234.6 324.34 188.83 330.87 186.59 347.42 232.37"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <polygon
                                points="357.42 199.53 359.8 206.1 314.34 221.67 311.96 215.1 357.42 199.53"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M389.72,132c-.08.15-10.5-5.27-23.29-12.1s-23.08-12.5-23-12.65,10.51,5.27,23.3,12.1S389.8,131.84,389.72,132Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M414.4,159.23c-.08.15-17.34-8.93-38.55-20.27s-38.33-20.66-38.25-20.81,17.33,8.92,38.54,20.27S414.48,159.08,414.4,159.23Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M408.34,170.56c-.08.15-17.34-8.92-38.55-20.27s-38.33-20.66-38.25-20.81,17.33,8.93,38.54,20.27S408.42,170.41,408.34,170.56Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M402.28,181.89c-.08.15-17.34-8.92-38.55-20.26S325.4,141,325.48,140.82s17.33,8.92,38.54,20.26S402.36,181.74,402.28,181.89Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <path
                                d="M396.22,193.22c-.08.15-17.34-8.92-38.55-20.26s-38.34-20.66-38.25-20.81,17.33,8.92,38.54,20.26S396.3,193.07,396.22,193.22Z"
                                style={{ fill: "#e0e0e0" }}
                              />
                              <rect
                                x="394.17"
                                width="2.58"
                                height="43.98"
                                style={{ opacity: "0.2" }}
                              />
                            </g>
                            <g id="freepik--Lamp--inject-5">
                              <path
                                d="M335.23,97.19H455.69S444.57,44,394.55,44C350.06,44,335.23,97.19,335.23,97.19Z"
                                style={{ fill: "#B82009" }}
                              />
                              <rect
                                x="394.17"
                                width="2.58"
                                height="43.98"
                                style={{ fill: "#B82009" }}
                              />
                            </g>
                            <g id="freepik--Floor--inject-5">
                              <path
                                d="M663.67,439.83c0,.14-129.25.26-288.66.26S86.33,440,86.33,439.83s129.23-.26,288.68-.26S663.67,439.68,663.67,439.83Z"
                                style={{ fill: "#263238" }}
                              />
                            </g>
                            <g id="freepik--Plant--inject-5">
                              <path
                                d="M118.29,377.2a12.62,12.62,0,0,1,8.78,4.5,22.15,22.15,0,0,1,4.47,9c1.69,6.32.65,13.79-1.15,20.08-6.84-2.45-11.07-9.75-13-13.59-3-6.06-4.79-18.86.87-20"
                                style={{ fill: "#B82009" }}
                              />
                              <path
                                d="M140.24,418.45a10.74,10.74,0,0,1-.5-10.78,14.26,14.26,0,0,1,8.6-6.91c1.67-.52,3.61-.73,5.06.24a4.58,4.58,0,0,1,1.77,4.31,9.27,9.27,0,0,1-2,4.42c-3.33,4.51-7.37,8.26-13,8.72"
                                style={{ fill: "#B82009" }}
                              />
                              <path
                                d="M141,439.58a6.5,6.5,0,0,1-.31-1.31c-.18-.94-.42-2.15-.71-3.6a37.77,37.77,0,0,1-.74-12.11,23,23,0,0,1,4.49-11.21,15.32,15.32,0,0,1,2.59-2.63,9.16,9.16,0,0,1,.82-.58,1.15,1.15,0,0,1,.3-.18,25.37,25.37,0,0,0-3.45,3.59,23.85,23.85,0,0,0-4.28,11.08c-.64,4.66.15,8.93.61,12,.24,1.53.44,2.77.55,3.63A8.23,8.23,0,0,1,141,439.58Z"
                                style={{ fill: "#263238" }}
                              />
                              <path
                                d="M120.49,386.83a2.34,2.34,0,0,1,.28.51c.18.4.42.9.7,1.53.61,1.33,1.46,3.26,2.49,5.65,2.06,4.79,4.82,11.45,7.7,18.87s5.33,14.19,7,19.12c.86,2.46,1.53,4.46,2,5.85.21.66.37,1.19.5,1.6a2.61,2.61,0,0,1,.15.57,2.46,2.46,0,0,1-.24-.54c-.15-.4-.34-.92-.59-1.57l-2.11-5.8c-1.79-4.89-4.29-11.65-7.16-19.06s-5.59-14.09-7.57-18.91c-1-2.37-1.77-4.3-2.34-5.71-.26-.64-.47-1.15-.63-1.56A3.49,3.49,0,0,1,120.49,386.83Z"
                                style={{ fill: "#263238" }}
                              />
                              <path
                                d="M132.87,425.6a25.18,25.18,0,0,0-19.52-12.13c-2-.14-4.46.2-5.36,2s.3,4,1.68,5.46a21.49,21.49,0,0,0,23.27,5.2"
                                style={{ fill: "#B82009" }}
                              />
                              <path
                                d="M116.43,418.89a7.15,7.15,0,0,1,1.27.05,12.09,12.09,0,0,1,1.47.17c.57.11,1.24.17,1.94.37a19.41,19.41,0,0,1,2.31.64,22.91,22.91,0,0,1,2.57,1,27.8,27.8,0,0,1,5.42,3.21,27.31,27.31,0,0,1,4.48,4.44,22.49,22.49,0,0,1,1.57,2.25,21.93,21.93,0,0,1,1.18,2.09,17.4,17.4,0,0,1,.8,1.8,11.34,11.34,0,0,1,.51,1.4,6.82,6.82,0,0,1,.33,1.23c-.11,0-.59-1.72-1.94-4.28a22,22,0,0,0-1.21-2,25.32,25.32,0,0,0-1.58-2.19,26.65,26.65,0,0,0-9.74-7.52c-.87-.38-1.7-.74-2.51-1a21.87,21.87,0,0,0-2.27-.69C118.23,419.09,116.42,419,116.43,418.89Z"
                                style={{ fill: "#263238" }}
                              />
                            </g>
                            <g id="freepik--Folder--inject-5">
                              <path
                                d="M299,234.54,263.6,416.34,259,440.14,495,439c10.6-.05,20-9.46,23.39-23.44l41.86-171.63c2.59-10.61-3.09-21.65-11.13-21.64l-238.92.25C305,222.53,300.34,227.45,299,234.54Z"
                                style={{ fill: "#B82009" }}
                              />
                              <g style={{ opacity: "0.5" }}>
                                <path d="M299,234.54,263.6,416.34,259,440.14,495,439c10.6-.05,20-9.46,23.39-23.44l41.86-171.63c2.59-10.61-3.09-21.65-11.13-21.64l-238.92.25C305,222.53,300.34,227.45,299,234.54Z" />
                              </g>
                              <path
                                d="M472.39,404l-25-201.41c-1-8.25-7.59-14.41-15.36-14.38l-54.8.17a15,15,0,0,0-10.83,4.8l-26,27.67L188,221.67c-9.31.05-16.47,8.87-15.24,18.77l23.21,186.15c1,8.24,7.59,14.39,15.34,14.38l265.65-.53c29.58.61,32.41-8.12,32.41-8.12C475.41,439.83,472.39,404.05,472.39,404Z"
                                style={{ fill: "#B82009" }}
                              />
                              <g style={{ opacity: "0.5" }}>
                                <polygon
                                  points="357.84 363.72 348.88 373.34 279.88 311.26 288.84 301.64 357.84 363.72"
                                  style={{ fill: "#fff" }}
                                />
                                <polygon
                                  points="345.13 299.51 355.03 308.42 292.6 375.47 282.69 366.56 345.13 299.51"
                                  style={{ fill: "#fff" }}
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WalletBody;
