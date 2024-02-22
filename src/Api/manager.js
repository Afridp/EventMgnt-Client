
import { managerAxiosInstance, handleError, attachToken } from "./axiosConfig";

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

export const getEvents = async ({managerUUID}) => {
   
    const data = await managerAxiosInstance.get(`/getEvents?managerUUID=${managerUUID}`)
    return data
}

export const addingNewEvent = async (eventData) => {

    const data = await managerAxiosInstance.post('/addEvent', eventData)
    return data
}

export const editEvent = async (values) => {
    const data = await managerAxiosInstance.patch('/editEvent', values)
    return data
}

export const listAndUnlist = async (eventId) => {
    const data = await managerAxiosInstance.get(`/listing/${eventId}`)
    return data
}

export const getBookedEvents = async () => {
    const data = await managerAxiosInstance.get(`/getBookedEvents`)
    return data
}

export const getEventData = async (eventId) => {

    const data = await managerAxiosInstance.get(`/getEventData?eventId=${eventId}`)
    return data
}

export const getTodaysEvents = async () => {
    const data = await managerAxiosInstance.get('/getTodaysEvents')
    return data
}

export const getUpcomingEvents = async () => {
    const data = await managerAxiosInstance.get('/getUpcomingEvents')
    return data
}

export const subscribe = async (datas) => {
    const data = await managerAxiosInstance.post('/subscribe', datas)
    return data
}

export const addEmployee = async (values) => {
    const data = await managerAxiosInstance.post('/addEmployee', values)
    return data
}

export const getAllEmployees = async ({ search }) => {
    const data = await managerAxiosInstance.get(`/getAllEmployees?search=${search}`)
    return data
}

export const blockAndUnblockEmployee = async (employeeId) => {
    const data = await managerAxiosInstance.patch(`/blockUnblockEmployee?employeeId=${employeeId}`)
    return data
}

export const getNewBookings = async () => {
    const data = await managerAxiosInstance.get(`/getNewBookings`)
    return data
}

export const getEventForm = async (eventUUID) => {
    const data = await managerAxiosInstance.get(`/getFormOfEvent?eventUUID=${eventUUID}`)
    return data
}

export const submitForm = async(values) => {
    const data = await managerAxiosInstance.post('/submitForm',values)
    return data
}
