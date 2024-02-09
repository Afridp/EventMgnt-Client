import { styleSubNotification } from "../../JsStyles/Styles";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { isSubscribed, subscribedPlan } from "../../Api/manager";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function TrialModal({ managerId }) {
  const [subNotification, setSubNotification] = useState(true);
  const [open, setOpen] = useState(false);

  const handleTrailConfirm = () => {
    setSubNotification(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubNotification(true);
  };

  //   const handleOpenNotification = () => {
  //     setTimeout(() => {
  //       setSubNotification(true);
  //     }, 4000);
  //   };

  //   const handleClose = () => {
  //     setSubNotification(false);
  //   };
//   const subscriptionSelected = async (scheme) => {
//     try {
//         console.log(scheme);
//       const res = await subscribedPlan({ selectedPlan: scheme, managerId });
//       toast.success(res.data.message);
//       setSubNotification(false);
//       setOpen(false);
//       //   if (!res.data.success) {
//       //     setTimeout(() => {
//       //       setSubNotification(true);
//       //     }, 4000);
//       //   }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const checkSubscribed = async () => {
//     try {
//       const res = await isSubscribed();
//       console.log(res.status);
//       if (res.status === 200) {
//        setSubNotification(true)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  useEffect(() => {
    // handleOpenNotification();
    // subscriptionSelected("");\
    // checkSubscribed();
  }, []);

  return (
    <>
      <Modal
        open={subNotification}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleSubNotification}>
          <section className="dark:bg-dark">
            <div className="container mx-auto">
              <div className="relative z-10 overflow-hidden rounded bg-primary py-12 px-8 md:p-[70px]">
                <div className="flex flex-wrap items-center -mx-4">
                  <div className="w-full px-4 lg:w-1/2">
                    <span className="block mb-4 text-base font-medium text-white">
                      Find Your Next Dream App
                    </span>
                    <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:mb-8 sm:text-[40px]/[48px] lg:mb-0">
                      <span className="xs:block"> Get started with </span>
                      <span>our free trial</span>
                    </h2>
                  </div>
                  <div className="w-full px-4 lg:w-1/2">
                    <div className="flex flex-wrap lg:justify-end">
                      <Link
                        to={"/manager/pro"}
                        href="javascript:void(0)"
                        className="inline-flex py-3 my-1 mr-4 text-base font-medium transition bg-white rounded-md hover:bg-yellow-300 hover:text-black hover:border-yellow-700 hover:border  text-primary px-7"
                      >
                        Get Premium Now
                      </Link>
                      <a
                        onClick={handleTrailConfirm}
                        href="javascript:void(0)"
                        className="inline-flex py-3 my-1 text-base font-medium text-white transition rounded-md bg-secondary px-7 hover:bg-opacity-90 hover:border hover:border-white"
                      >
                        Start Free Trial
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="absolute top-0 left-0 z-[-1]">
                    <svg
                      width="189"
                      height="162"
                      viewBox="0 0 189 162"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="16"
                        cy="-16.5"
                        rx="173"
                        ry="178.5"
                        transform="rotate(180 16 -16.5)"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="-157"
                          y1="-107.754"
                          x2="98.5011"
                          y2="-106.425"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" stopOpacity="0.07" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="absolute bottom-0 right-0 z-[-1]">
                    <svg
                      width="191"
                      height="208"
                      viewBox="0 0 191 208"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="173"
                        cy="178.5"
                        rx="173"
                        ry="178.5"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="-3.27832e-05"
                          y1="87.2457"
                          x2="255.501"
                          y2="88.5747"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" stopOpacity="0.07" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Box>
      </Modal>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm 30-day Trial"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to start a 30-day trial of our service. During this
            trial period, you can host up to 5 events. After the trial period
            ends, you will need to subscribe to continue using our service. Do
            you agree to start the trial?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => subscriptionSelected("Trail")} autoFocus>
            Start Trial
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TrialModal;
