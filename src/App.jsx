import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import ManagerRoutes from './Routes/Manger/ManagerRoutes'
import ClientRoutes from './Routes/Client/ClientRoutes'
import Signup from './Pages/ClientPages/Signup'

function App() {


  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/manager/*' element={<ManagerRoutes/>}/>
        <Route path='/*' element={<ClientRoutes/>}/>
        <Route path='/test' element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App
