import { APPS } from "./Constants"

// const baseURL = import.meta.env.VITE_APP_NODE_ENV === "development" ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_SERVER_BASE_URL;
// http://35.171.16.37:3000
// http://localhost:3000/
export const getApp = () => {



    const subdomain = getSubdomain(window.location.hostname)
    
    const mainApp = APPS.find((app) => app.main)
    if (!mainApp) throw new Error("Must have a main app")

    if (subdomain === "") {
        console.log("null aaane");
        return mainApp.app
    }

    const app = APPS.find(app => app.subdomain === subdomain)
    if (!app) return mainApp.app
    return app.app
}

// this fn returns the subdomain name excluding the localhost or the hostdomain name.eg:- haai.localhost | domainname => haai
const getSubdomain = (location) => {
    
    // const locationParts = location.split('.')
    

    // let sliceTill = -2

    // const isLocalHost = locationParts.slice(-1)[0] === 'localhost' 
    
    // if (isLocalHost) sliceTill = -1
    // return locationParts.slice(0, sliceTill).join("")
    return ""
}

// const getSubdomainOFproduction = (location) => {
//     const
// }