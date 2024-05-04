import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { ChakraProvider } from '@chakra-ui/react'

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import { getApp } from "./Utils/Helpers";
// import TenantCommonRoutes from "./Routes/TenantCommon/TenantCommonRoutes";

export const App = () => {
  const CurrentApp = getApp();
  
  return (
    <Router>
      <ToastContainer />
      <CurrentApp />
      {/* <TenantCommonRoutes/> */}
    </Router>
  );
};
