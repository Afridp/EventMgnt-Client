import { Route, Routes } from "react-router-dom";
import Login from "../../Pages/Employee/Login";
import Details from "../../Pages/Employee/Details";
import Home from "../../Pages/Employee/Home";

function EmployeeeRoutes() {
  return (
    <>
      <div className="h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/details" element={<Details />} />
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    </>
  );
}

export default EmployeeeRoutes;
