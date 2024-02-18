import { useState } from "react";
import PropTypes from "prop-types";
import LoaderManager from "../../Pages/ErrorPages/LoaderManager";
import { toast } from "react-toastify";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { employeeRegister } from "../../Api/employee";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1500,
  bgcolor: "background.paper",
  p: 7,
};

export default function AddEmployees({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        setErrorEmail("Please enter a valid email address.");
        return;
      }

      const res = await employeeRegister({ email });
      toast.success(res?.data?.message, {
        position: "top-center",
        hideProgressBar: true,
      });

      setEmail("");
      
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  return (
    <>
      {loading ? (
        <LoaderManager loading={loading} />
      ) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-description">
                <div className=" grid grid-cols-2">
                  <h1 className="relative mt-24 text-center text-pretty font-normal">
                    Adding New Employee..? please enter new employee email to
                    genarete Employee credential to login,credentials will send
                    to this email id.
                  </h1>

                  <div className="">
                    <label
                      htmlFor="UserEmail"
                      className="relative block mx-20 mt-14 mb-6 overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                      <input
                        type="email"
                        id="UserEmail"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                      {errorEmail && (
                        <div className="col-span-2 text-red-600">
                          {errorEmail}
                        </div>
                      )}

                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Email
                      </span>
                    </label>
                  </div>

                  <Typography
                    color="gray"
                    className="inline-block mt-10 pb-7 text-center font-normal"
                  ></Typography>
                  <div className="flex items-center justify-center mt-1 pb-7">
                    <button
                      className="inline-block bg-black px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                      onClick={() => handleSubmit()}
                      role="button"
                      tabIndex="0"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}



AddEmployees.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
