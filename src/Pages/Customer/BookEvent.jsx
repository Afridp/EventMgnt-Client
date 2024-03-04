import Navbar from "../../Components/Customer/Navbar";
import Footer from "../../Components/Customer/Footer";
// import BookingForm from "../../Components/Customer/Booking/BookingForm";
import Booking from "../../Components/Customer/Booking/Booking";

function BookEvent() {
  return (
    <>
      <Navbar />
      {/* <BookingForm /> */}
      <Booking/>
      <Footer />
    </>
  );
}

export default BookEvent;
