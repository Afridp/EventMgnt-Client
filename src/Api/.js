import axios from "axios"
import {toast}from "react-toastify"

const baseURL=import.meta.env.VITE_BASE_URL
const userBaseUrl=baseURL;
const adminBaseUrl=`${baseURL}/admin`;
const partnerBaseUrl=`${baseURL}/partner`;
const chatBaseUrl =`${baseURL}/chat`
const messageBaseUrl =`${baseURL}/message`

const createAxiosInstance=(baseURL)=>{  
    const instance=axios.create({
        baseURL,
        timeout:200000,
        timeoutErrorMessage:"Request timeout... Please try again !"

    })
    return instance;
}

const attachToken=(req,tokenName)=>{
    let authToken=localStorage.getItem(tokenName)
         if(authToken){
        req.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return req
}

export const chatAxiosInstance = createAxiosInstance(chatBaseUrl)
export const messageAxiosInstance = createAxiosInstance(messageBaseUrl)

// request interceptor



export const userAxiosInstance=createAxiosInstance(userBaseUrl);

userAxiosInstance.interceptors.request.use(async (req)=>{
    const modifiedReq=attachToken(req,"usertoken");
    return modifiedReq;
});

export const adminAxiosInstance=createAxiosInstance(adminBaseUrl);

adminAxiosInstance.interceptors.request.use(async (req)=>{
    const modifiedReq=attachToken(req,"adminToken")
    return modifiedReq;

})

export const partnerAxiosInstance=createAxiosInstance(partnerBaseUrl);

partnerAxiosInstance.interceptors.request.use(async (req)=>{
    const modifiedReq=attachToken(req,"partnerToken")
    return modifiedReq
})

// response interceptor

userAxiosInstance.interceptors.response.use(
(response)=>response,
(error)=>handleAxiosError(error)
)
adminAxiosInstance.interceptors.response.use(
(response)=>response,
(error)=>handleAxiosError(error)
)
partnerAxiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>handleAxiosError(error)
)

// handle error
const handleAxiosError=(error)=>{
   
    const errorMessage=error.response ? error.response.data.message : "An error occured while request."
    if (error.response){
        if(error.response.status===404){
            toast.error("404-Resource Not found")
        
    }else if(error.response.status==500){
        toast.error("500-INternal server Error")
    }else{
        toast.error(errorMessage)
    }
}else{
    toast.error(errorMessage)
}
};