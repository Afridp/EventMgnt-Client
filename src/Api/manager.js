
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

export const getEvents = async ({managerId}) => {

    const data = await managerAxiosInstance.get(`/getEvents?managerId=${managerId}`)
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

export const getEventForm = async (eventId) => {
    const data = await managerAxiosInstance.get(`/getFormOfEvent?eventId=${eventId}`)
    return data
}

export const submitForm = async(values) => {
    const data = await managerAxiosInstance.post('/submitForm',values)
    return data
}

export const getCaptians = async() => {
    const data = await managerAxiosInstance.get('/getEmployees')
    return data
}

// export const setCaptian = async() => {
//     const data = await managerAxiosInstance.get('/setCaptianToEvent',{eventId,})
// }

export const approveEvent = async (eventId) => {

    const data = await managerAxiosInstance.post('/approveEvent',{eventId})
    return data
} 

export const fileUploads = async(images) => {
    const data = await managerAxiosInstance.post('/fileUpload',images)
    return data
}   

export const appearencePost = async (values) => {
    const data = await managerAxiosInstance.post('/appearancePost',values)
    return data
}

export const contentPost = async (values) => {
    const data = await managerAxiosInstance.post('/contentsPost',values)
    return data
}