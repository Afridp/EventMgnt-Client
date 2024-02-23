
import Navbar from "../../Components/Customer/Navbar";
// import CreateEventForm from "../../Components/Customer/BookingForm";
import Footer from "../../Components/Customer/Footer";
import Booking from "../../Components/Customer/Booking/Booking";

function BookEvent() {
  return (
    <>
      <Navbar />
      {/* <CreateEventForm /> */}
      <Booking/>
      <Footer />
    </>
  );
}

export default BookEvent;
