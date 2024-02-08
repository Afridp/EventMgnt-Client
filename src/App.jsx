import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import ManagerRoutes from "./Routes/Manger/ManagerRoutes";
import CustomerRoutes from "./Routes/Customer/CustomerRoutes";
import TestTailwind from "./Pages/ManagerPages/TestTailwind";



function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/test" element={<TestTailwind />} />
      </Routes>
    </Router>
  );
}

export default App;
