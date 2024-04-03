import { Route, Routes } from "react-router-dom";
import Otp from "../../Pages/Tenents/Otp";
import SignUp from "../../Pages/Tenents/Signup";
import Dashboard from "../../Pages/Tenents/Dashboard";
import EnterDomain from "../../Pages/Tenents/EnterDomain";



function TenantCommonRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/enterDomain" element={<EnterDomain />} />
      </Routes>
    </div>
  );
}

export default TenantCommonRoutes;
