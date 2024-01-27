
import { Navigate } from 'react-router-dom'

function Protect(props) {
    const token = localStorage.getItem('customerToken')
  
    if(token){
      // eslint-disable-next-line react/prop-types
      return props.children
    }else{
     return <Navigate to='/signin'/>
    }
  }

export default Protect
