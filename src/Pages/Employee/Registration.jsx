import { useState } from "react";
import { employeeRegister } from "../../Api/employee";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import LoaderEmployee from "../ErrorPages/LoaderEmployee";

function Registration() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        setError("Please enter a valid email address.");
        return;
      }
      const res = await employeeRegister(email);

      toast.success(res.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };
  return (
    <>
      {loading ? (
        <LoaderEmployee loading={loading} />
      ) : (
        <div className="border my-60 mx-32 px-10 grid grid-cols-2">
          <h1 className="relative mt-20 text-center text-pretty font-bold">
            New Employee..? please enter your email to get Employee credential
            to login,credentials will send to this email id after the approval
            from management team.
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
              {error && <div className="col-span-2 text-red-600">{error}</div>}

              <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Email
              </span>
            </label>
            <label
              htmlFor="UserEmail"
              className="relative block mx-20 mb-14 overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
            >
              <input
                type="email"
                id="UserEmail"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
              {error && <div className="col-span-2 text-red-600">{error}</div>}

              <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Name
              </span>
            </label>
          </div>
          <Typography
            color="gray"
            className="inline-block mt-10 pb-7 text-center font-normal"
          >
            Got Credentials?{" "}
            <Link to="/employee/signin" className="text-blue-600">
              Login here
            </Link>
          </Typography>
          <div className="flex items-center justify-center -mt-10 pb-7">
            <a
              className="inline-block bg-black px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              onClick={() => handleSubmit()}
            >
              Submit
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Registration;
