import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { ChakraProvider } from '@chakra-ui/react'

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import { getApp } from "./Utils/Helpers";

export const App = () => {
  const CurrentApp = getApp();
  console.log(CurrentApp);
  return (
    <Router>
      <ToastContainer />
      <CurrentApp />
    </Router>
  );
};
