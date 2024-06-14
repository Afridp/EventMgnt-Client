
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
const mid = localStorage.getItem('mid')

// APi's
export const customerSignup = async (signupData) => {

    const data = await customerAxiosInstance.post(`/${mid}/signup`, signupData)
    return data

}

export const otpVerification = async (verificationData) => {

    const data = await customerAxiosInstance.post(`/${mid}/otpVerification`, verificationData)
    return data
}

export const resendOtp = async (customerId) => {

    const data = await customerAxiosInstance.post(`/resendOtp/${customerId}`)
    return data
}

export const customerSignin = async (signinData) => {

    const data = await customerAxiosInstance.post(`/${mid}/signin`, signinData)
    return data
}

export const fetchEvents = async ({ search, sort }) => {

    const data = await customerAxiosInstance.get(`/${mid}/getEvents?search=${search}&sort=${sort}`,)
    return data
}

export const getEventForm = async (eventId) => {
    const data = await customerAxiosInstance.get(`/${mid}/getEventFormField?eventId=${eventId}`)
    return data
}

export const submitEvent = async (formValuesAndData, customerId, eventId) => {
    const data = await customerAxiosInstance.post(`/${mid}/submitEvent/${customerId}?eventId=${eventId}`, formValuesAndData)
    return data
}

export const findCustomer = async (customerId) => {
    const data = await customerAxiosInstance.get(`/${mid}/findCustomer/${customerId}`)
    return data
}

export const fetchBookings = async ({ customerId, search, sort }) => {
    const data = await customerAxiosInstance.get(`/${mid}/getBookings/${customerId}?search=${search}&sort=${sort}`)
    return data
}

export const getEditingEvent = async (bookingId) => {
    const data = await customerAxiosInstance.get(`/${mid}/getEditingEvent/${bookingId}`)
    return data
}

export const editBooked = async (values, eventId) => {
    const data = await customerAxiosInstance.put(`/editBooked/${eventId}`, values)
    return data
}

export const cancelEvent = async (eventId) => {
    const data = await customerAxiosInstance.delete(`/${mid}/cancelBooked/${eventId}`)
    return data
}

export const updateProfilePic = async ({ profile, customerId }) => {
    const data = await customerAxiosInstance.post(`/${mid}/updateProfilePic?customerId=${customerId}`, { profile })
    return data
}

export const updateProfile = async (values, customerId) => {
    const data = await customerAxiosInstance.post(`/${mid}/updateProfile?customerId=${customerId}`, values)
    return data
}

export const changePassword = async (values, customerId) => {
    const data = await customerAxiosInstance.post(`/${mid}/changePassword?customerId=${customerId}`, values)
    return data
}

export const stripePaymentApi = async (formValues, personalValues, eventId, amt) => {
    const data = customerAxiosInstance.post(`/${mid}/paymentCheckout`, { formValues, personalValues, eventId, amt })
    return data
}

export const walletTopupStripeApi = async (values) => {
    const data = customerAxiosInstance.post(`/${mid}/topupWallet`, values)
    return data
}

export const getWalletDetails = async (customerId) => {
    const data = customerAxiosInstance.get(`/${mid}/getWalletDetails?customerId=${customerId}`)
    return data
}

export const addBalance = async (values) => {
    const data = customerAxiosInstance.post(`/${mid}/addBalance`, values)
    return data
}