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
import Wallet from "../../Pages/Customer/Wallet"



function CustomerRoutes() {


  const pathname = window.location.pathname
  const subdomain = pathname.split('/')[1];

  localStorage.setItem("mid", subdomain)
    
  return (
    <div>
        <Routes>
            <Route path="/:mid/signup" element={<Public mid={subdomain}><Signup mid={subdomain}/></Public>}/>
            <Route path="/:mid/otp" element={<Public mid={subdomain}><Otp mid={subdomain}/></Public>}/>
            <Route path="/:mid/signin" element={<Public mid={subdomain}><Signin mid={subdomain}/></Public>}/>
          
            <Route path='/:mid/' element={<Home mid={subdomain}/>}/>
            <Route path='/:mid/events' element={<Events mid={subdomain}/>}/>
            <Route path="/:mid/events/book/:eventId" element={<Protect><BookEvent mid={subdomain}/></Protect>}/>
            <Route path="/:mid/myEvents" element={<Protect><MyEvents mid={subdomain}/></Protect>}/>
            <Route path="/:mid/myEvents/seemore/:bookingId" element={<Protect><ViewOrEditBooked mid={subdomain}/></Protect>}/>
            <Route path="/:mid/profile" element={<Protect><Profile mid={subdomain}/></Protect>}/>
            <Route path="/:mid/payment"  element={<Protect><PaymentStatus mid={subdomain}/></Protect>}/>
            <Route path="/:mid/wallet/:amt?/:customerId?/:status?" element={<Protect><Wallet mid={subdomain}/></Protect>}/>
        </Routes>
    </div>
  )
}

export default CustomerRoutes

