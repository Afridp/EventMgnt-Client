import Footer from "../../Components/Customer/Footer";
import Bookings from "../../Components/Customer/Profile/Bookings";
import Navbar1 from "../../Components/Customer/Navbar1";

// eslint-disable-next-line react/prop-types
function MyEvents({mid}) {
  return (
    <>
      <Navbar1 mid={mid}/>
      <Bookings/>
      <Footer/>
    </>
  );
}

export default MyEvents;
