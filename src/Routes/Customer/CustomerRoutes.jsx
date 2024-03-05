import { Route,Routes } from "react-router-dom"
import Signup from "../../Pages/Customer/Signup"
import Otp from "../../Pages/Customer/Otp"
import Signin from "../../Pages/Customer/Signin"
import Home from "../../Pages/Customer/Home"
import Events from "../../Pages/Customer/Events"
import BookEvent from "../../Pages/Customer/BookEvent"
import MyEvents from "../../Pages/Customer/MyEvents"
import Protect from "./Protect"
import Public from "./Public"

import ViewOrEditBooked from "../../Pages/Customer/ViewOrEditBooked"
import Profile from "../../Pages/Customer/Profile"
import PaymentStatus from "../../Pages/Customer/PaymentStatus"




function CustomerRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/signup" element={<Public><Signup/></Public>}/>
            <Route path="/otp" element={<Public><Otp/></Public>}/>
            <Route path="/signin" element={<Public><Signin/></Public>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/events/book/:eventId" element={<Protect><BookEvent/></Protect>}/>
            <Route path="/myEvents" element={<Protect><MyEvents/></Protect>}/>
            <Route path="/myEvents/seemore/:bookingId" element={<Protect><ViewOrEditBooked/></Protect>}/>
            <Route path="/profile" element={<Protect><Profile/></Protect>}/>
            <Route path="/payment"  element={<PaymentStatus/>}/>
        </Routes>
    </div>
  )
}

export default  CustomerRoutes

