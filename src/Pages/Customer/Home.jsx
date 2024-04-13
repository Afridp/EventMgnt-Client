import Aboutus from "../../Components/Customer/Home/Aboutus";
import Footer from "../../Components/Customer/Footer";
import Jobs from "../../Components/Customer/Home/Jobs";
import Jumbortron from "../../Components/Customer/Home/Jumbortron";
import Navbar from "../../Components/Customer/Navbar";

// eslint-disable-next-line react/prop-types
function Home({mid}) {
  return (
    <>
      <Navbar mid={mid}/>
      <Jumbortron mid={mid}/>
      <Aboutus />
      <Jobs />
      <Footer mid={mid}/>
      {/* need to chnge the move problem */}
    </>
  );
}

export default Home;
