import Navbar1 from "../../Components/Customer/Navbar1"
import PaymentSuccess from "../../Components/Customer/Booking/PaymentSuccess"


// eslint-disable-next-line react/prop-types
function PaymentStatus({mid}) {
  return (
    <>
      <Navbar1 mid={mid}/>
      <PaymentSuccess/>     
    </>
  )
}

export default PaymentStatus