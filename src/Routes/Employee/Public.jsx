import { Navigate } from "react-router-dom"

function Public(props) {
  const token = localStorage.getItem('employeeToken')
    if(token){
       
        return <Navigate to='/employee/home'/>
      
    }else{
        // eslint-disable-next-line react/prop-types
        return props.children
    }
}

export default Public