import { APPS } from "./Constants"

export const getApp = () => {
    const subdomain = getSubdomain(window.location.hostname)

    const mainApp = APPS.find((app) => app.main)
    if(!mainApp) throw new Error ("Must have a main app")
    
    if (subdomain === "") return mainApp.app

    const app = APPS.find(app => app.subdomain === subdomain)
    if(!app) return mainApp.app
    return app.app
}


const getSubdomain = (location) => {
    const locationParts = location.split('.')

    let sliceTill = -2

    const isLocalHost = locationParts.slice(-1)[0] === 'localhost'
    if (isLocalHost) sliceTill = -1
    return locationParts.slice(0, sliceTill).join("")
}