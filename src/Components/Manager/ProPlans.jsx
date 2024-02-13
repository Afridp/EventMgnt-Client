import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../../Api/manager";
import { Bounce, toast } from "react-toastify";
import { setManagerDetails } from "../../Redux/slice/managerSlice";
import LoaderManager from "../../Pages/ErrorPages/LoaderManager";

function ProPlans() {
  const { manager } = useSelector((state) => state.managerSlice);
  console.log(manager);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    if (manager.isTrailed) {
      setOpen(true);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const subscriptionSelected = async (scheme) => {
    try {
      setLoading(true);
      const res = await subscribe({
        selectedPlan: scheme,
        managerId: manager._id,
      });
      toast(`🦄 ${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      dispatch(
        setManagerDetails({
          manager: res.data.managerSubscribed,
        })
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    if(manager.isTrailed){
    showModal();
    }
  }, []);
  return (
    <>
      <LoaderManager loading={loading} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Subcription Ended"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your current plan is expired,Please upgrage your account to continue
            our service.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:pt-52 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
            <div className="rounded-2xl border border-gray-300  p-6 shadow-sm hover:border-indigo-600 hover:ring-1 hover:ring-indigo-600 sm:order-last sm:px-8 lg:p-12 transition-transform transform hover:scale-105 text-white">
              <div className="text-center">
                <h2 className="text-lg font-medium">
                  Yearly
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold -900 sm:text-4xl">
                    {" "}
                    6499₹{" "}
                  </strong>

                  <span className="text-sm font-medium">/year</span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> 20 users included </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> 5GB of storage </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> Email support </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> Help center access </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> Phone support </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> Community access </span>
                </li>
              </ul>

              <a
                onClick={() => subscriptionSelected("Yearly")}
                className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring "
              >
                Get Started
              </a>
            </div>

            <div className="rounded-2xl border text-white  border-gray-300 p-6 shadow-sm hover:border-indigo-600 hover:ring-1 hover:ring-indigo-600 sm:px-8 lg:p-12 transition-transform transform hover:scale-105">
              <div className="text-center">
                <h2 className="text-lg font-medium">
                  Monthly
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold sm:text-4xl">
                    {" "}
                    599₹{" "}
                  </strong>

                  <span className="text-sm font-medium ">/month</span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> 10 users included </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> 2GB of storage </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> Email support </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span> Help center access </span>
                </li>
              </ul>

              <a
                href="#"
                onClick={() => subscriptionSelected("Monthly")}
                //   className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-white"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProPlans;
