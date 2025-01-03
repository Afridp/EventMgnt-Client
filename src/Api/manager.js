
import { managerAxiosInstance, tenantsAxiosInstance, attachManager, handleError, attachToken } from "./axiosConfig";

// request interceptor
managerAxiosInstance.interceptors.request.use(async (req) => {
    let modifiedRequest
    modifiedRequest = await attachToken(req, "managerToken")
    modifiedRequest = await attachManager(modifiedRequest, "currentManager")
    return modifiedRequest
})
// response interceptor 
managerAxiosInstance.interceptors.response.use(
    (res) => res,
    (err) => handleError(err)
)

// API's
export const managerSignup = async (signupData, scheme, amount) => {

    const data = await tenantsAxiosInstance.post('/createTanent', { signupData, scheme, amount })
    return data
}

export const otpVerification = async (verificationData) => {
    const data = await tenantsAxiosInstance.post('/otpVerification', verificationData)
    return data
}
export const resendOtp = async (managerId) => {
    const data = await tenantsAxiosInstance.post('/resendOtp', managerId)
    return data
}

export const completeSubscription = async (subDetails) => {
    const data = await tenantsAxiosInstance.post('/completeSubscription', subDetails)
    return data
}

// jsdbfkjsadjfklajsdlfk

export const managerSignin = async (signinData) => {
    const data = await managerAxiosInstance.post('/signin', signinData)
    return data
}

export const createSubdomain = async (values) => {
    const data = await managerAxiosInstance.post('/createSubdomain', values)
    return data
}

export const getEvents = async () => {

    const data = await managerAxiosInstance.get(`/getEvents`)
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

export const getNewSubmissions = async () => {
    const data = await managerAxiosInstance.get(`/getNewSubmissions`)
    return data
}

export const getEventForm = async (eventId) => {
    const data = await managerAxiosInstance.get(`/getFormOfEvent?eventId=${eventId}`)
    return data
}

export const submitForm = async (values) => {
    const data = await managerAxiosInstance.post('/submitForm', values)
    return data
}

export const getCaptians = async () => {
    const data = await managerAxiosInstance.get('/getEmployees')
    return data
}

// export const setCaptian = async() => {
//     const data = await managerAxiosInstance.get('/setCaptianToEvent',{eventId})
// }

export const approveEvent = async (submissionId) => {

    const data = await managerAxiosInstance.post('/approveEvent', { submissionId })
    return data
}

export const fileUploads = async (images) => {
    const data = await managerAxiosInstance.post('/fileUpload', images)
    return data
}

export const appearencePost = async (values) => {
    const data = await managerAxiosInstance.post('/appearancePost', values)
    return data
}

export const contentPost = async (values) => {
    const data = await managerAxiosInstance.post('/contentsPost', values)
    return data
}

export const stripePaymentApiForSub = async (values, scheme, amount) => {
    const data = await managerAxiosInstance.post('/createTanent', { values, scheme, amount })
    return data
}

export const updateProfile = async (values) => {
    const data = await managerAxiosInstance.post('/updateProfile', values)
    return data
}

export const getProfileDetails = async (managerId) => {
    const data = await managerAxiosInstance.get(`/getProfile?managerId=${managerId}`)
    return data
}   