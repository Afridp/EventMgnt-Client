import { APPS } from "./Constants"
let ENV = import.meta.env.VITE_APP_NODE_ENV

const baseURL = ENV === "development" ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_SERVER_BASE_URL;

export const getApp = () => {

    const subdomain = getSubdomain(window.location.hostname)


    const mainApp = APPS.find((app) => app.main)
    if (!mainApp) throw new Error("Must have a main app")

    if (subdomain === "") {
        return mainApp.app
    }

    const app = APPS.find(app => app.subdomain === subdomain)
    if (!app) return mainApp.app
    return app.app
}

// this fn returns the subdomain name excluding the localhost or the hostdomain name.eg:- haai.localhost | domainname => haai
const getSubdomain = (location) => {
    // location wil be - customer.brigadge.online / brigadge.online / localhost / customer.localhost

    let sliceFrom = -2
    let sliceTill = -2
    // checking the project is running in dev or in server,if env is dev make slice from = -1 else = -2
    if (ENV === "development") {
        
        sliceFrom = -1
    }
    // any way split the hostname - ['customer','brigadge','online'] / ['localhost']
    const locationParts = location.split('.')
    // checking the array have the brigadge or localhost (if in server we get ***.brigadge.online) thats why we are using slicefrom.if in dev mode we only get ***.localhost .
    // whatever we get brigadge or localhost we take location from ['customer','location','hostname'] and localhost from ['localhost'] and checking it is matchup with current baseurl,it must be same which is true

    const isLocalHost = locationParts.slice(sliceFrom)[0] === baseURL
   
    //    if it is true we take the part before the baseURL which is customer in the case of having subdomain or in the case of nothing which is localhost or brigadege it will return empty string 
    if (isLocalHost) {
      
        if (locationParts.length <= 2 && locationParts[0] !== baseURL) {
            sliceTill = -1
        }
        return locationParts.slice(0, sliceTill).join("")
    }
    return ""
}
