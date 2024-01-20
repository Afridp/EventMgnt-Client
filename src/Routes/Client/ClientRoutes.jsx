import { Route,Routes } from "react-router-dom"
import Signup from "../../Pages/ClientPages/Signup"
import Otp from "../../Pages/ClientPages/Otp"
import Login from "../../Pages/ClientPages/Login"
import Home from "../../Pages/ClientPages/Home"




function ClientRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/signin" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
          
        </Routes>
    </div>
  )
}

export default ClientRoutes