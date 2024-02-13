import {  attachToken, employeeAxiosInstance, handleError } from "./axiosConfig";

// request interceptors
employeeAxiosInstance.interceptors.request.use(async (req) => {
    let modifiedRequest = attachToken(req, "employeeToken")
    return modifiedRequest
})

// response interceptors
employeeAxiosInstance.interceptors.response.use(
    (res) => res,
    (error) => handleError(error)
)

// Api's

export const employeeRegister = async(email) => {
    
    const data = await employeeAxiosInstance.post('/register',{email})
    return data
}