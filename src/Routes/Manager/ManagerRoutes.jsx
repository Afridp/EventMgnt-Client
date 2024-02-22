import { Route, Routes } from "react-router-dom";
import SignUp from "../../Pages/Manager/Signup";
import Siginin from "../../Pages/Manager/Signin";
import Home from "../../Pages/Manager/Home";
import Events from "../../Pages/Manager/Events";
// import AddEvent from "../../Pages/ManagerPages/AddEvent";
import MyEvents from "../../Pages/Manager/MyEvents";
import Otp from "../../Pages/Manager/Otp";
import Public from "./Public";
import Protect from "./Protect";
import EventSeemore from "../../Pages/Manager/EventSeemore";
import SubscriptionPlans from "../../Pages/Manager/SubscriptionPlans";
import IsSubscribed from "./IsSubscribed";
import Employees from "../../Pages/Manager/Employees";
import NewEvents from "../../Pages/Manager/NewBookings";
import Account from "../../Pages/Manager/Account";
import Customer from "../../Pages/Manager/Customer";


function ManagerRoute() {
  return (
    
      <Routes>
            <Route path="/signup" element={<Public><SignUp/></Public> }/>
            <Route path="/otp" element={<Public><Otp/></Public>}/>
            <Route path="/signin" element={<Public><Siginin/></Public>}/>
            <Route path="/" element={<Protect><Home/></Protect> }/>
            <Route path="/events" element={<Protect><IsSubscribed><Events/></IsSubscribed></Protect>}/>
            <Route path="/events/seemore/:eventId" element={<Protect><IsSubscribed><EventSeemore/></IsSubscribed></Protect>}/>
            <Route path="/pro" element={<Protect><SubscriptionPlans/></Protect>}/>
            {/* <Route path="/addEvent" element={<AddEvent/>}/> */}
            <Route path="/myEvents" element={<Protect><IsSubscribed><MyEvents/></IsSubscribed></Protect>}/>
            <Route path="/newEvents" element={<Protect><IsSubscribed><NewEvents/></IsSubscribed></Protect>}/>
            <Route path="/employeeMgt" element={<Protect><IsSubscribed><Employees/></IsSubscribed></Protect>}/>
            <Route path="/customerMgt" element={<Protect><Customer/></Protect>}/>
            <Route path="/account" element={<Protect><Account/></Protect>}/>
           
        </Routes>
      
  );
}

export default ManagerRoute;
  