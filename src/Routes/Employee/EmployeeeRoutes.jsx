
import { Route, Routes } from "react-router-dom";
import Registration from "../../Pages/Employee/Registration";

function EmployeeeRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration/>}/>
      </Routes>
    </>
  );
}

export default EmployeeeRoutes;
