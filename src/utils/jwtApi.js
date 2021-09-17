import { api } from "./endpoints"

export const jwt = {

    set: (jwt) => {
        localStorage.setItem("MeetingOrganizerJWT", jwt)
    },

    get: () => {
        return localStorage.getItem("MeetingOrganizerJWT")
    },

    isPresent: () => {
        return !!localStorage.getItem("MeetingOrganizerJWT") 
    },

    remove: () => {
        localStorage.removeItem("MeetingOrganizerJWT", jwt)
    },

    isValid: async () => {
        return jwt.isPresent() && await api.getStatusCode() < 300
    }

}