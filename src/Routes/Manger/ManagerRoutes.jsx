import { Route, Routes } from "react-router-dom";
import SignUp from "../../Pages/Manager/Signup";
import Siginin from "../../Pages/Manager/Signin";
import Home from "../../Pages/Manager/Home";
import AllEvents from "../../Pages/Manager/AllEvents";
// import AddEvent from "../../Pages/ManagerPages/AddEvent";
import MyEvents from "../../Pages/Manager/MyEvents";
import Otp from "../../Pages/Manager/Otp";
import Public from "./Public";
import Protect from "./protect";
import EventSeemore from "../../Pages/Manager/EventSeemore";
import SubscriptionPlans from "../../Pages/Manager/SubscriptionPlans";
import IsSubscribed from "./IsSubscribed";
import Employees from "../../Pages/Manager/Employees";


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
            <Route path="/myEvents" element={<Protect><IsSubscribed><MyEvents/></IsSubscribed></Protect>}/>
            <Route path="/employeeMgt" element={<Protect><IsSubscribed><Employees/></IsSubscribed></Protect>}/>
           
        </Routes>
      
  );
}

export default ManagerRoute;
  