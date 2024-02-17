import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutManager } from "../../Redux/slice/managerSlice";

function Protect(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("managerToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      // eslint-disable-next-line react/prop-types
      return props.children;
    } else {
      localStorage.removeItem("managerToken");
      dispatch(logoutManager());
      return (
        <Navigate to="/manager/signin?msg=Your session is expired,please login again" />
      );
    }
  } else {
    return <Navigate to="/manager/signin?msg=" />;
  }
}

export default Protect;
