import { Route,Routes } from "react-router-dom"
import Signup from "../../Pages/Customer/Signup"
import Otp from "../../Pages/Customer/Otp"
import Signin from "../../Pages/Customer/Signin"
import Home from "../../Pages/Customer/Home"
import Events from "../../Pages/Customer/Events"
import CreateEventPage from "../../Pages/Customer/BookEvent"
import MyEvents from "../../Pages/Customer/MyEvents"
import Protect from "./Protect"
import Public from "./Public"

import ViewOrEditBooked from "../../Pages/Customer/ViewOrEditBooked"




function CustomerRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/signup" element={<Public><Signup/></Public>}/>
            <Route path="/otp" element={<Public><Otp/></Public>}/>
            <Route path="/signin" element={<Public><Signin/></Public>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/events/book" element={<Protect><CreateEventPage/></Protect>}/>
            <Route path="/myEvents" element={<Protect><MyEvents/></Protect>}/>
            <Route path="/myEvents/seemore/:eventId" element={<ViewOrEditBooked/>}/>       
        </Routes>
    </div>
  )
}

export default  CustomerRoutes

