import Navbar1 from "../../Components/Customer/Navbar1";
import Footer from "../../Components/Customer/Footer";
import SeeMoreBooked from "../../Components/Customer/Profile/SeeMoreBooked";

// eslint-disable-next-line react/prop-types
function ViewOrEditBooked({mid}) {
  return (
    <>
      <Navbar1 mid={mid}/>
      <SeeMoreBooked />
      <Footer />
    </>
  );
}

export default ViewOrEditBooked;
