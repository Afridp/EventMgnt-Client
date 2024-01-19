import { attachToken, clientAxiosInstance, handleError } from "./axiosConfig";

// request interceptor
clientAxiosInstance.interceptors.request.use(async (req) => {
    let modifiedRequest = attachToken(req, "clientToken")
    return modifiedRequest
})

// response interceptor 
clientAxiosInstance.interceptors.response.use(
    (res) => res,
    (error) => handleError(error)
)

// APi's
export const clientSignup = async (signupData) => {

    const data = await clientAxiosInstance.post('/signup', signupData)
    return data

}

export const otpVerification = async (verificationData) => {

    const data = await clientAxiosInstance.post('/otpVerification', verificationData)
    return data
}

export const resendOtp = async(clientId) =>{
    
    const data = await clientAxiosInstance.post('/resendOtp',clientId)
    return data
}

export const clientSignin = async(signinData) =>{

    const data = await clientAxiosInstance.post('/signin',signinData)
    return data
}