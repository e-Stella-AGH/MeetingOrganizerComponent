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
    }

}