import Aboutus from "../../Components/Client/Aboutus";
import Footer from "../../Components/Client/Footer";
import Jobs from "../../Components/Client/Jobs";
import Jumbortron from "../../Components/Client/Jumbortron";
import Navbar from "../../Components/Client/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Jumbortron />
      <Aboutus />
      <Jobs />
      <Footer/>
    </>
  );
}

export default Home;
