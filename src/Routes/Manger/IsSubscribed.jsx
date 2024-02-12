import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function IsSubscribed({ children }) {
  const { manager } = useSelector((state) => state.managerSlice);

  if (manager.subscribed) {
    return children;
  } else {
    return <Navigate to={"/manager/pro"} />;
  }
}

import PropTypes from "prop-types";

IsSubscribed.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsSubscribed
