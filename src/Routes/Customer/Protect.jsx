import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutCustomer } from "../../Redux/slice/customerSlice";

function Protect(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("customerToken");
  const mid = localStorage.getItem("mid");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      // eslint-disable-next-line react/prop-types
      return props.children;
    } else {
      localStorage.removeItem("customerToken");
      dispatch(logoutCustomer());
      return <Navigate to={`/${mid}/signin`} />;
    }
  } else {
    return <Navigate to={`/${mid}/signin`} />;
  }
}

export default Protect;
