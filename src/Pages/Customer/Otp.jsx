import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { otpValidation } from "../../ValidationSchemas/customerValidation/otp";
import { otpVerification, resendOtp } from "../../Api/customer";

const Otp = () => {
  const [countDown, setCountDown] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { customerEmail, customerId, otpId } = location.state;

  const decrementTimer = () => {
    if (countDown > 0) {
      setCountDown(countDown - 1);
    } else {
      setShowResendButton(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(decrementTimer, 1000);
    return () => {
      return clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const enteredOtp = Object.values(values).join("");

      const res = await otpVerification({ enteredOtp, otpId, customerId });
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
      navigate("/signin", { state: "Email verified, You can login now" });
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setLoading1(true);
      const res = await resendOtp(customerId);

      toast(res.data.message);
      setCountDown(30);
      setShowResendButton(false);
    } finally {
      setLoading1(false);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    validationSchema: otpValidation,
    onSubmit,
  });

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const handleKeyUp = (e) => {
    switch (e.target.name) {
      case "otp1":
        input2Ref.current.focus();
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input2Ref.current.focus();
        }
        break;
      case "otp2":
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input3Ref.current.focus();
        }
        break;
      case "otp3":
        if (!e.target.value) {
          input2Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      case "otp4":
        if (!e.target.value) {
          input3Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="spinnerouter"></div>
      </div>

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-r from-purple-400 to-indigo-600 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-white">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {customerEmail}</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp1"
                        maxLength={1}
                        ref={input1Ref}
                        value={values.otp1}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=""
                      />
                      {errors.otp1 && touched.otp1 && (
                        <p className="text-red-600">{errors.otp1}</p>
                      )}
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp2"
                        maxLength={1}
                        ref={input2Ref}
                        value={values.otp2}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=""
                      />
                      {errors.otp2 && touched.otp2 && (
                        <p className="text-red-600">{errors.otp2}</p>
                      )}
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp3"
                        maxLength={1}
                        ref={input3Ref}
                        value={values.otp3}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=""
                      />
                      {errors.otp3 && touched.otp3 && (
                        <p className="text-red-600">{errors.otp1}</p>
                      )}
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp4"
                        maxLength={1}
                        ref={input4Ref}
                        value={values.otp4}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=""
                      />
                      {errors.otp4 && touched.otp4 && (
                        <p className="text-red-600">{errors.otp4}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#49BBBD] border-none text-white text-sm shadow-sm"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Verifying.." : "Verify"}
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      {countDown > 0 ? (
                        <p>Resend otp in {countDown} seconds</p>
                      ) : (
                        showResendButton && (
                          <p
                            className="font-medium text-orange-500 hover:underline cursor-pointer"
                            onClick={resendOTP}
                            disabled={loading1}
                          >
                            {loading1 ? "Resending.." : " Resend OTP"}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
