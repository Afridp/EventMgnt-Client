
import { attachToken, customerAxiosInstance, handleError } from "./axiosConfig";

// request interceptor
customerAxiosInstance.interceptors.request.use(async (req) => {
    let modifiedRequest = attachToken(req, "clientToken")
    return modifiedRequest
})

// response interceptor 
customerAxiosInstance.interceptors.response.use(
    (res) => res,
    (error) => handleError(error)
)

// APi's
export const customerSignup = async (signupData) => {

    const data = await customerAxiosInstance.post('/signup', signupData)
    return data

}

export const otpVerification = async (verificationData) => {

    const data = await customerAxiosInstance.post('/otpVerification', verificationData)
    return data
}

export const resendOtp = async (customerId) => {

    const data = await customerAxiosInstance.post(`/resendOtp/${customerId}`)
    return data
}

export const customerSignin = async (signinData) => {

    const data = await customerAxiosInstance.post('/signin', signinData)
    return data
}

export const fetchEvents = async () => {
    const data = await customerAxiosInstance.get('/getEvents')
    return data
}

export const bookEvent = async (values,customerId) => {
    const data = await customerAxiosInstance.post(`/bookEvent/${customerId}`, values)
    return data
}

export const findCustomer = async (customerId) => {
    const data = await customerAxiosInstance.get(`/findCustomer/${customerId}`)
    return data
}

export const fetchBookings = async (customerId) => {
    const data = await customerAxiosInstance.get(`/getBookings/${customerId}`)
    return data
}

export const fetchEvent = async(eventId) => {
    const data = await customerAxiosInstance.get(`/getEvent/${eventId}`)
    return data
}

export const editBooked = async(values,eventId) => {
    const data = await customerAxiosInstance.put(`/editBooked/${eventId}`,values)
    return data
}

export const cancelEvent = async(eventId) => {
    const data = await customerAxiosInstance.delete(`/deleteBooked/${eventId}`)
    return data
}