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

export const employeeRegister = async(values) => {
    const data = await employeeAxiosInstance.post('/register',values)
    return data
}