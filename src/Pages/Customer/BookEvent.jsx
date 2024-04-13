import Navbar1 from "../../Components/Customer/Navbar1";
import Footer from "../../Components/Customer/Footer";
// import BookingForm from "../../Components/Customer/Booking/BookingForm";
import Booking from "../../Components/Customer/Booking/Booking";

// eslint-disable-next-line react/prop-types
function BookEvent({mid}) {
  return (
    <>
      <Navbar1 mid={mid}/>
      {/* <BookingForm /> */}
      <Booking />
      <Footer />
    </>
  );
}

export default BookEvent;
