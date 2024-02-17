import { useDispatch } from "react-redux";
import { logoutManager } from "../../Redux/slice/managerSlice";
import { useNavigate } from "react-router-dom";

function AccountBody() {
const dispatch = useDispatch()
const navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem("managerToken");
        dispatch(logoutManager());
        navigate("/manager");
      };
  return (
    <>
      {/* <div className="bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"> */}
      <div className="m-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="h-32 flex items-center justify-center  lg:h-96 border">
            <button onClick={handleLogout} className="btn">Logout</button>
          </div>
          <div className="h-32 lg:h-96 border lg:col-span-2">
           
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}

export default AccountBody;
