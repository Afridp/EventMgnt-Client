import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { createSubdomain } from "../../Api/manager";
import { useDispatch, useSelector } from "react-redux";
import { setDomainName } from "../../Redux/slice/managerSlice";
import { toast } from "react-toastify";
import LoaderManager from "../../Pages/ErrorPages/LoaderManager";
import { useNavigate } from "react-router-dom";
import { generateBaseURL } from "../../Config";


function InputDomain() {
  const { manager, domainName } = useSelector((state) => state.managerSlice);
  // State to manage the input value
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const baseURL = domainName ? generateBaseURL(domainName) : '/';
  // Function to handle input change
  const handleInputChange = (e) => {
    setDomain(e.target.value);
  };
console.log(baseURL);
  const createUserSubDomain = async () => {
    try {
      setLoading(true);
      const res = await createSubdomain({ domain, managerId: manager._id });
      dispatch(
        setDomainName({
          domainName: res.data.domain,
        })
      );
      navigate(`${baseURL}/manager/`);
      toast.success(res.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <>
      {loading ? (
        <LoaderManager loading={loading} />
      ) : (
        <div className="p-20 mx-36 space-y-10">
          <div>
            <Typography className="font-bold text-lg">
              Enter Your Prefered Subdomain Name.{" "}
            </Typography>
            <p>
              please enter your company name of any unique name as subdomain.
            </p>
          </div>
          <div>
            <label
              htmlFor="UserDomain"
              className="block text-sm font-medium text-gray-700"
            >
              Subdomain.
            </label>
            <div className="relative">
              <input
                type="text"
                id="UserDomain"
                value={domain}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />

              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-lg font-semibold text-gray-500">
                  .EventBrigadege.com
                </span>
              </div>
            </div>
            <Button onClick={createUserSubDomain} className="w-full mt-2">
              Create
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default InputDomain;
