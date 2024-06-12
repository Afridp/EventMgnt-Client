/* eslint-disable no-undef */
import axios from "axios";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_APP_NODE_ENV === "development" ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_SERVER_BASE_URL


// // const manager = localStorage.getItem('currentManager')
// console.log(import.meta.env.VITE_APP_SERVER_BASE_URL,"thsi is bvasek");
let tenantsUrl = ''
let managerUrl = ''
let customerUrl = ''
let employeeUrl = ''

if (import.meta.env.VITE_APP_NODE_ENV === "development") {
console.log(baseURL,"thsi is base url");
    tenantsUrl = `http://${baseURL}:4000`
    managerUrl = `http://manager.${baseURL}:4000`
    customerUrl = `http://customer.${baseURL}:4000`
    employeeUrl = `http://employee.${baseURL}:4000`
} else {
    console.log(baseURL,"this is baseURL");
    tenantsUrl = `https://backend.${baseURL}.online`
    managerUrl = `https://managerbackend.${baseURL}.online`
    customerUrl = `https://customerbackend.${baseURL}.online`
    employeeUrl = `https://employee.backend${baseURL}.online`
}


// Axios instance creator   
const createAxiosInstance = (baseURL) => {
    // console.log(baseURL);    
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

export const attachManager = (req, role) => {
    let id = localStorage.getItem(role)
    if (id) {
        req.headers[`role`] = id
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
            console.log(error.response.data.message);
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
export const tenantsAxiosInstance = createAxiosInstance(tenantsUrl)
