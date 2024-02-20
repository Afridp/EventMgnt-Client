import { useDispatch } from "react-redux";
import { logoutManager } from "../../Redux/slice/managerSlice";
import { toast } from "react-toastify";


function AccountBody() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("managerToken");
    dispatch(logoutManager());
    toast.success("Logout successful", { Position: toast.POSITION.TOP_CENTER });
    window.location.reload();
  };
  return (
    <>
      {/* <div className="bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"> */}
      <div className="m-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="h-32 flex items-center justify-center  lg:h-96 border">
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </div>
          <div className="h-32 lg:h-96 border lg:col-span-2"></div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}

export default AccountBody;
