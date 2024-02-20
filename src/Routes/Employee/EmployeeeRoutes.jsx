import { Route, Routes } from "react-router-dom";
import Login from "../../Pages/Employee/Login";
import Home from "../../Pages/Employee/Home";
import Protect from "./Protect";
import Public from "./Public";

function EmployeeeRoutes() {
  return (
    <>
      <div className="h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Public><Login /></Public>} />
          <Route path="/home" element={<Protect><Home/></Protect>}/>
        </Routes>
      </div>
    </>
  );
}

export default EmployeeeRoutes;
