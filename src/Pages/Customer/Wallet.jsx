
import Navbar1 from '../../Components/Customer/Navbar1'
import WalletBody from '../../Components/Customer/Profile/WalletBody'
import Footer from '../../Components/Customer/Footer'

// eslint-disable-next-line react/prop-types
function Wallet({mid}) {
  return (
    <>
     <Navbar1 mid={mid}/>
     <WalletBody/>
     <Footer/>
    </>
  )
}

export default Wallet
