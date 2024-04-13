import { Navigate } from "react-router-dom"

function Public(props) {
  const token = localStorage.getItem('customerToken')
    if(token){
       
        // eslint-disable-next-line react/prop-types
        return <Navigate to={`/${props.mid}/`}/>
      
    }else{
        // eslint-disable-next-line react/prop-types
        return props.children
    }
}

export default Public