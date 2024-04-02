import { Navigate } from "react-router-dom"

function Public(props) {
  const token = localStorage.getItem('managerToken')
    if(token){
       
        return <Navigate to='/'/>
      
    }else{
        // eslint-disable-next-line react/prop-types
        return props.children
    }
}

export default Public