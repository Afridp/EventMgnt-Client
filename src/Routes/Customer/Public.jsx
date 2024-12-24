import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function Public(props) {
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
        
        return <Navigate to={`/${mid}/`} />;
      }
    // eslint-disable-next-line react/prop-types
    // return <Navigate to={`/${props.mid}/`} />;
  } else {
    // eslint-disable-next-line react/prop-types
    return props.children;
  }
}

export default Public;
