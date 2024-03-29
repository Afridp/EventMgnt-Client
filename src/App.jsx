import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { ChakraProvider } from '@chakra-ui/react'

import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";


import ManagerRoutes from "./Routes/Manager/ManagerRoutes";
import CustomerRoutes from "./Routes/Customer/CustomerRoutes";
import EmployeeeRoutes from "./Routes/Employee/EmployeeeRoutes";
import Dashboard from "./Pages/Manager/Dashboard";



function App() {
  return (
    <Router>
      <ToastContainer />
      {/* <ChakraProvider /> */}
      <Routes>
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/Employee/*" element={<EmployeeeRoutes />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        
      </Routes>
    </Router>
  );
}

export default App;
