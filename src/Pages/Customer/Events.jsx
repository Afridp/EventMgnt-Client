/* eslint-disable react/prop-types */
import EventList from "../../Components/Customer/Booking/EventList"
import Footer from "../../Components/Customer/Footer"
import Navbar1 from "../../Components/Customer/Navbar1"



function Events({mid}) {
  return (
    <div>
      <Navbar1 mid={mid} />
      <EventList/>
      <Footer/>
    </div>
  )
}

export default Events
