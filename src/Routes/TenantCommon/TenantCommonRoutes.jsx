import { Route, Routes } from "react-router-dom";
import Otp from "../../Pages/Manager/Otp";
import SignUp from "../../Pages/Manager/Signup";
import Dashboard from "../../Pages/Manager/Dashboard";
import EnterDomain from "../../Pages/Manager/EnterDomain";



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
