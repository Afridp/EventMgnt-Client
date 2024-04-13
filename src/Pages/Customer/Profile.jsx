import Navbar1 from "../../Components/Customer/Navbar1";
import ProfileBody from "../../Components/Customer/Profile/ProfileBody";
import Footer from "../../Components/Customer/Footer";

// eslint-disable-next-line react/prop-types
function Profile({mid}) {
  return (
    <>
      <Navbar1 mid={mid}/>
      <ProfileBody />
      <Footer />
    </>
  );
}

export default Profile;
