import { managerAxiosInstance, attachToken, handleError } from "./axiosConfig";

// request interceptor
managerAxiosInstance.interceptors.request.use(async (req) => {
    let modifiedRequest = await attachToken(req, "managerToken")
    return modifiedRequest
})
// response interceptor
managerAxiosInstance.interceptors.response.use(
    (res) => res,
    (err) => handleError(err)
)

// API's
export const managerSignup = async (signupData) => {

    const data = await managerAxiosInstance.post('/signup', signupData)
    return data

}

export const otpVerification = async (verificationData) => {


    const data = await managerAxiosInstance.post('/otpVerification', verificationData)
    return data

}
export const resendOtp = async (managerId) => {

    const data = await managerAxiosInstance.post('/resendOtp', managerId)
    return data

}

export const managerSignin = async (signinData) => {

    const data = await managerAxiosInstance.post('/signin', signinData)
    return data

}

export const getEvents = async()=>{

    const data = await managerAxiosInstance.get('/getEvents')
    return data
}

export const addingNewEvent = async (eventData) => {

    const data = await managerAxiosInstance.post('/addEvent',eventData)
    return data
}

export const editEvent = async (values) => {

    const data = await managerAxiosInstance.patch('/editEvent',values)
    return data
    
}

export const listAndUnlist = async (eventId) => {

    const data = await managerAxiosInstance.get(`/listing/${eventId}`)
    return data
}