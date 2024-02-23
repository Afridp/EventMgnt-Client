import Aboutus from "../../Components/Customer/Home/Aboutus";
import Footer from "../../Components/Customer/Footer";
import Jobs from "../../Components/Customer/Home/Jobs";
import Jumbortron from "../../Components/Customer/Home/Jumbortron";
import Navbar from "../../Components/Customer/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Jumbortron />
      <Aboutus />
      <Jobs />
      <Footer />
      {/* need to chnge the move problem */}
    </>
  );
}

export default Home;
