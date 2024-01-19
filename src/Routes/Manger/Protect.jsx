
import { Navigate } from 'react-router-dom'

function Protect(props) {
    const token = localStorage.getItem('managerToken')
  
    if(token){
      // eslint-disable-next-line react/prop-types
      return props.children
    }else{
     return <Navigate to='/manager/signin'/>
    }
  }

export default Protect
