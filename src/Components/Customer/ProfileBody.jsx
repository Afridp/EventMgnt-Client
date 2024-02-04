import { useState } from "react";
import useFileToDataURLConverter from "../../CustomHooks/useFileToDataURLConverter";

import { updateProfilePic } from "../../Api/customer";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutCustomer,
  setCustomerDetails,
} from "../../Redux/slice/customerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfileBody() {
  const { customer } = useSelector((state) => state.customerSlice);
  const { convertFileToDataURL } = useFileToDataURLConverter();
  const [loading, setLoading] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    userName: customer.userName,
    email: customer.email,
    mobile: customer,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];

      if (!file) {
        throw new Error("Please select a file.");
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Please upload a JPEG or PNG image."
        );
      }
      if (file.size > maxSizeInBytes) {
        throw new Error("File size exceeds the maximum allowed size (5 MB).");
      }
      const dataUrl = await convertFileToDataURL(e.target.files[0]);
      const res = await updateProfilePic({
        profile: dataUrl,
        customerId: customer._id,
      });
      dispatch(
        setCustomerDetails({
          customer: res?.data?.customerData,
        })
      );
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      toast.warning(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    dispatch(logoutCustomer());
    navigate("/");
  };

  return (
    <div className="relative bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] p-5">
      <div className="container mx-auto my-36">
        <div className="p-10 grid grid-cols-1 shadow-2xl lg:grid-cols-3 transform rounded-xl bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
          <div className="h-96 border-r-2 border-gray-400 grid-cols-1 grid gap-6">
            <div className="flex items-center justify-center mt-10">
              <form action="">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                  id="profileImageInput"
                />
                <label htmlFor="profileImageInput">
                  {loading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <img
                      className="rounded-full border w-40 h-40 cursor-pointer"
                      src={
                        customer.profilePic
                          ? customer.profilePic
                          : "https://res.cloudinary.com/diwidawoi/image/upload/v1706970756/customerProfiles/null.jpg"
                      }
                      alt="P"
                    />
                  )}
                </label>
              </form>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold">{customer?.userName}</h1>
              <h3>Joined On {customer.createdAt}</h3>
            </div>
            <div className="flex items-center justify-center">
              <button className="mt- group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <svg fill="white" viewBox="0 0 512 512" className="w-4 h-4">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div
                  className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </button>
            </div>
          </div>

          <div className="h-96 rounded-lg lg:col-span-2">
            <div className="flex flex-col items-start gap-10 my-10 ml-10">
              <label
                htmlFor="UserName"
                className="block overflow-hidden"
              >
                <span className="text-xs font-mono text-gray-700">
                  {" "}
                  User Name{" "}
                </span>

                <input
                  type="text"
                  id="UserName"
                  value={customer.userName}
                  placeholder="anthony@rhcp.com"
                  className="mt-1 w-full border-none p-0 bg-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />
              </label>
              <label
                htmlFor="Useremail"
                className=""
               
              >
                <span className="text-xs font-mono text-gray-700">
                  {" "}
                  Email{" "}
                </span>

                <input
                  type="email"
                  id="Useremail"
                  value={customer.email}
                  placeholder="anthony@rhcp.com"
                  className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />
              </label>
              <label
                htmlFor="PhoneNumber"
                className="block overflow-hidden"
              >
                <span className="text-xs font-mono text-gray-700">
                  {" "}
                Phone Number{" "}
                </span>

                <input
                  type="text"
                  value={customer.mobile}
                  id="PhoneNumber"
                  placeholder="anthony@rhcp.com"
                  className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />
              </label>
            </div>
            <div className="flex items-end justify-end gap-4">
              {/* Base */}

              <a
                className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                href="/download"
              >
                <span className="absolute inset-0 border border-red-800 group-active:border-red-800"></span>
                <span className="block border border-red-800 bg-red-800 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                  Change Password
                </span>
              </a>

              {/* Border */}

              <a
                className="group relative inline-block text-sm font-medium text-red-800 focus:outline-none focus:ring active:text-red-500"
                href="/download"
              >
                <span className="absolute inset-0 border border-current"></span>
                <span className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                  Edit Profile
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
