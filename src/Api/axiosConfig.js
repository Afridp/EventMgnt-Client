import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;


const customerUrl = baseURL
const managerUrl = ` ${baseURL}/manager`
const employeeUrl = `${baseURL}/employee`


// Axios instance creator
const createAxiosInstance = (baseURL) => {
    // creating a customized instance of axios using .create 
    const instance = axios.create({
        // setting base url, so every req made using managerapi,the url will be prefixed this base url
        baseURL,
        // timeout: 200000,
        timeoutErrorMessage: "Request timeout... Please try again !"
    })
    return instance;
}

// Token attacher
export const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName)

    if (authToken) {
    
        req.headers["Authorization"] = `Bearer${authToken}`;
    }
   
    return req
}

// Error handler
export const handleError = (error) => {

    const errorMessage = error.response ? error.response.data.message : "An error occured while request"

    if (error.response) {
        if (error.response.status === 409 || error.response.status === 403 || error.response.status === 404) {
            toast.warning(error.response.data.message)

        } else if (error.response.status === 500 || error.response.status === 401) {
            toast.error(error.response.data.message)
        } else {
            toast.error(errorMessage)
        }
    } else {
        toast.error(errorMessage)
    }
};



export const managerAxiosInstance = createAxiosInstance(managerUrl)
export const customerAxiosInstance = createAxiosInstance(customerUrl)
export const employeeAxiosInstance = createAxiosInstance(employeeUrl)
 