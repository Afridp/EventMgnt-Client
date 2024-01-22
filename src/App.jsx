import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";


import ManagerRoutes from './Routes/Manger/ManagerRoutes'
import ClientRoutes from './Routes/Client/ClientRoutes'
// import Signup from './Pages/ClientPages/Signup'
import TestTailwind from './Pages/ManagerPages/TestTailwind';

function App() {


  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/manager/*' element={<ManagerRoutes/>}/>
        <Route path='/*' element={<ClientRoutes/>}/>
        <Route path='/test' element={<TestTailwind/>}/>
      </Routes>
    </Router>
  )
}

export default App
