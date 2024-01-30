import { Route,Routes } from "react-router-dom";
import SignUp from "../../Pages/ManagerPages/Signup";
import Siginin from "../../Pages/ManagerPages/Signin"
import Home from "../../Pages/ManagerPages/Home"
import Event from "../../Pages/ManagerPages/Event";
// import AddEvent from "../../Pages/ManagerPages/AddEvent";
import MyEvents from "../../Pages/ManagerPages/MyEvents";
import TestTailwind from "../../Pages/ManagerPages/TestTailwind";
import Otp from "../../Pages/ManagerPages/Otp"
import Public from "./Public";
import Protect from "./protect";


{/* <Public></Public> */}

function ManagerRoute(){
    return(
        <Routes>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/otp" element={<Public><Otp/></Public>}/>
            <Route path="/signin" element={<Public><Siginin/></Public>}/>
            <Route path="/" element={<Protect><Home/></Protect> }/>
            <Route path="/events" element={<Protect><Event/></Protect>}/>
            {/* <Route path="/addEvent" element={<AddEvent/>}/> */}
            <Route path="/myEvents" element={<MyEvents/>}/>
            <Route path="/test" element={<TestTailwind/>}/>
        </Routes>
    )
}

export default ManagerRoute