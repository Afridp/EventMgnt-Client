import { Route, Routes } from "react-router-dom";
import SignUp from "../../Pages/ManagerPages/Signup";
import Siginin from "../../Pages/ManagerPages/Signin";
import Home from "../../Pages/ManagerPages/Home";
import Event from "../../Pages/ManagerPages/Event";
// import AddEvent from "../../Pages/ManagerPages/AddEvent";
import MyEvents from "../../Pages/ManagerPages/MyEvents";
import Otp from "../../Pages/ManagerPages/Otp";
import Public from "./Public";
import Protect from "./protect";
import EventSeemore from "../../Pages/ManagerPages/EventSeemore";
import Subscription from "../../Pages/ManagerPages/Subscription";

{
  /* <Public></Public> */
}

function ManagerRoute() {
  return (
    
      <Routes>
            <Route path="/signup" element={<Public><SignUp/></Public> }/>
            <Route path="/otp" element={<Public><Otp/></Public>}/>
            <Route path="/signin" element={<Public><Siginin/></Public>}/>
            <Route path="/" element={<Protect><Home/></Protect> }/>
            <Route path="/events" element={<Protect><Event/></Protect>}/>
            <Route path="/events/seemore/:eventId" element={<EventSeemore/>}/>
            <Route path="/pro" element={<Subscription/>}/>
            {/* <Route path="/addEvent" element={<AddEvent/>}/> */}
            <Route path="/myEvents" element={<MyEvents/>}/>
           
        </Routes>
      
  );
}

export default ManagerRoute;
