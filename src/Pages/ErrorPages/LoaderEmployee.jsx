
import { styled } from "@mui/material/styles";


const CustomBackdrop = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",
  height: "100%",
  backgroundColor: "grey",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));



function LoaderEmployee(props) {
  const { open } = props;

  return (
    <CustomBackdrop open={open}>
      <span className="loading loading-ring loading-lg"></span>
    </CustomBackdrop>
  );
}

import PropTypes from "prop-types";

LoaderEmployee.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default LoaderEmployee;
