import Dashboard from "../../Components/Employee/Dashboard";
import Sidebar from "../../Components/Employee/Sidebar";

function Home() {
  return (
    <>
      <div className="h-screen flex overflow-hidden">
        <Sidebar />
        <Dashboard/>
      </div>
    </>
  );
}

export default Home;
