import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutEmployee } from "../../Redux/slice/employeeSlice";


function Protect(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("employeeToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      // eslint-disable-next-line react/prop-types
      return props.children;
    } else {
      localStorage.removeItem("empployeeToken");
      dispatch(logoutEmployee());
      return (
        <Navigate to="/employee" />
      );
    }
  } else {
    return <Navigate to="/employee" />;
  }
}

export default Protect;
