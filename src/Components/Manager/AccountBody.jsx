import { useDispatch, useSelector } from "react-redux";
import { logoutManager } from "../../Redux/slice/managerSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getProfileDetails, updateProfile } from "../../Api/manager";

function AccountBody() {
  const { manager } = useSelector((state) => state.managerSlice);
  const [isEditMode, setIsEditMode] = useState();
  const [ password, setPassword] = useState("********")
  const [ mobile, setMobile] = useState("")
  const dispatch = useDispatch();


  useEffect(()=>{
    fetchProfile()
  },[])
  const handleSaveProfile = async () => {
    try {
      const res = await updateProfile({password,mobile})
      toast.success(res.data.message)
    } catch (error) {
      
    }
  };

  const fetchProfile = async () => {
    try {
      
      const res = await getProfileDetails(manager._id)
      // setPassword(res?.data?.password)
      console.log(res?.data?.mobile);
      setMobile(res?.data?.mobile)
    } catch (error) {
      
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("managerToken");
    dispatch(logoutManager());
    toast.success("Logout successful", { Position: toast.POSITION.TOP_CENTER });
    window.location.reload();
  };
  return (
    <>
      {/* <div className="bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"> */}
      {/* <div className="m-10 mt-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="h-32 flex items-center justify-center lg:h-96 border shadow-5">
            <div>
              <h1>Company Id </h1>
              <h1>Company Address</h1>
              <h1>Revenue</h1>
            </div>
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </div>
          <div className="h-32 lg:h-96 border lg:col-span-2 shadow-5"></div>
        </div>
      </div> */}

      {/* <div className="m-10 mt-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col justify-between h-96 p-6 border shadow-5">
            <div>
              <h2 className="text-xl font-semibold">Manager Profile</h2>
              <div className="mt-4">
                <p>Company ID: ABC123</p>
                <p>Company Address: 123 Main St, Anytown USA</p>
                <p>Revenue: $1,000,000</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </div>
          <div className="h-96 p-6 border lg:col-span-2 shadow-5">
            <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              non elit vel ex iaculis finibus. Sed vel magna sit amet metus
              elementum facilisis. Nunc molestie, est vel bibendum eleifend,
              sapien est fringilla magna, sed feugiat eros nisi quis urna.
            </p>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">
                Key Performance Indicators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-600">Sales Growth</p>
                  <p className="text-2xl font-bold">15%</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-600">Customer Satisfaction</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-600">Employee Retention</p>
                  <p className="text-2xl font-bold">88%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="m-10 mt-20">
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
    <div className="flex flex-col justify-between h-96 p-6 border shadow-5">
      <div>
        <h2 className="text-xl font-semibold">Manager Profile</h2>
        <div className="mt-4">
          <p>Company ID: ABC123</p>
          <p>Company Address: 123 Main St, Anytown USA</p>
          <p>Revenue: $1,000,000</p>
        </div>
        <button
          onClick={() => setIsEditMode(true)}
          className="mt-4 btn btn-primary"
        >
          Edit Profile
        </button>
        {isEditMode && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Company ID"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Company Address"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Revenue"
              className="input input-bordered w-full mb-2"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditMode(false)}
                className="btn btn-secondary mr-2"
              >
                Cancel
              </button>
              <button onClick={handleSaveProfile} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleLogout} className="btn">
        Logout
      </button>
    </div>
    <div className="h-96 p-6 border lg:col-span-2 shadow-5">
      <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
        elit vel ex iaculis finibus. Sed vel magna sit amet metus elementum
        facilisis. Nunc molestie, est vel bibendum eleifend, sapien est
        fringilla magna, sed feugiat eros nisi quis urna.
      </p>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-600">Sales Growth</p>
            <p className="text-2xl font-bold">15%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-600">Customer Satisfaction</p>
            <p className="text-2xl font-bold">92%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-600">Employee Retention</p>
            <p className="text-2xl font-bold">88%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}

      <div className="m-10 ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col h-96 p-6 border shadow-5">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">Manager Profile</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Company ID:</span>
                  {/* {isEditMode ? (
                    <input
                      type="text"
                      defaultValue="ABC123"
                      className="input input-bordered w-40 ml-2"
                    />
                  ) : ( */}
                    <p>ABC123</p>
                  {/* )} */}
                </div>
                <div className="flex items-center justify-between">
                  <span>Company Mobile:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      defaultValue={mobile}
                      className="input input-bordered w-40 ml-2"
                    />
                  ) : (
                    <p>{mobile}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span>Password:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      placeholder="**********"
                      defaultValue=""
                      className="input input-bordered w-40 ml-2"
                    />
                  ) : (
                    <p>{password}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="btn bg-red-600"
                >
                  {isEditMode ? "Cancel" : "Edit Profile"}
                </button>
                {isEditMode && (
                  <button
                    onClick={handleSaveProfile}
                    className="btn bg-light-green-800"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
            <button onClick={handleLogout} className="mt-4 btn">
              Logout
            </button>
          </div>
          <div className="h-96 p-6 border lg:col-span-2 shadow-5">
            <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              non elit vel ex iaculis finibus. Sed vel magna sit amet metus
              elementum facilisis. Nunc molestie, est vel bibendum eleifend,
              sapien est fringilla magna, sed feugiat eros nisi quis urna.
            </p>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">
                Key Performance Indicators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-600">Sales Growth</p>
                  <p className="text-2xl font-bold">15%</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-600">Customer Satisfaction</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-gray-600">Employee Retention</p>
                  <p className="text-2xl font-bold">88%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New project created</td>
                  <td>06/12/2024</td>
                  <td>John Doe</td>
                </tr>
                <tr>
                  <td>Employee hired</td>
                  <td>06/10/2024</td>
                  <td>Jane Smith</td>
                </tr>
                <tr>
                  <td>Project completed</td>
                  <td>06/08/2024</td>
                  <td>Bob Johnson</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default AccountBody;
