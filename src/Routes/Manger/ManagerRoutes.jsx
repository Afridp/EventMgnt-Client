import { Route, Routes } from "react-router-dom";
import SignUp from "../../Pages/ManagerPages/Signup";
import Siginin from "../../Pages/ManagerPages/Signin";
import Home from "../../Pages/ManagerPages/Home";
import AllEvents from "../../Pages/ManagerPages/AllEvents";
// import AddEvent from "../../Pages/ManagerPages/AddEvent";
import MyEvents from "../../Pages/ManagerPages/MyEvents";
import Otp from "../../Pages/ManagerPages/Otp";
import Public from "./Public";
import Protect from "./protect";
import EventSeemore from "../../Pages/ManagerPages/EventSeemore";
import SubscriptionPlans from "../../Pages/ManagerPages/SubscriptionPlans";
import IsSubscribed from "./IsSubscribed";


function ManagerRoute() {
  return (
    
      <Routes>
            <Route path="/signup" element={<Public><SignUp/></Public> }/>
            <Route path="/otp" element={<Public><Otp/></Public>}/>
            <Route path="/signin" element={<Public><Siginin/></Public>}/>
            <Route path="/" element={<Protect><Home/></Protect> }/>

            <Route path="/events" element={<Protect><IsSubscribed><AllEvents/></IsSubscribed></Protect>}/>
            <Route path="/events/seemore/:eventId" element={<Protect><IsSubscribed><EventSeemore/></IsSubscribed></Protect>}/>
            <Route path="/pro" element={<Protect><SubscriptionPlans/></Protect>}/>
            {/* <Route path="/addEvent" element={<AddEvent/>}/> */}
            <Route path="/myEvents" element={<MyEvents/>}/>
           
        </Routes>
      
  );
}

export default ManagerRoute;
  