import Navbar1 from "../../Components/Customer/Navbar1";
import Footer from "../../Components/Customer/Footer";
// import BookingForm from "../../Components/Customer/Booking/BookingForm";
import Booking from "../../Components/Customer/Booking/Booking";

function BookEvent() {
  return (
    <>
      <Navbar1 />
      {/* <BookingForm /> */}
      <Booking />
      <Footer />
    </>
  );
}

export default BookEvent;
