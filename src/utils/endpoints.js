

let basicUrl = "https://meeting-organizer-estella.herokuapp.com/"

let jwt = null

const getHeader = (method, body = null) => {
    const headerWithoutBody = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'authorization': jwt
        }
    }
    if (body !== null) headerWithoutBody.body = JSON.stringify(body)
    return headerWithoutBody
}

const POST = "POST"

const GET = "GET"

const PUT = "PUT"

const isCorrectResponseStatus = (status) => { return status >= 200 && status < 300 }

const fetchData = (url, method, body) => {
    return fetch(url,
        getHeader(method, body)
    ).then(response => {
        if (isCorrectResponseStatus(response.status)) return response.body
        else throw response.body.msg
    })
}

export const api = {

    setJwt: (newJWT) => {
        jwt = newJWT
    },

    setUrl: (url) => {
        basicUrl = url
    },


    register: (email, password) => {
        return fetchData(basicUrl + "register", POST, { email: email, password: password })
    },

    login: (email, password) => {
        return fetchData(basicUrl + "login", POST, { email: email, password: password })
    },


    getTimeSlotsGuest: (uuid) => {
        return fetchData(basicUrl + "meeting/" + uuid, GET)
    },

    setMeetingGuest: (uuid, startTime, duration) => {
        return fetchData(basicUrl + "meeting/" + uuid + "/pick_time_slot", PUT, { startTime: startTime, duration: duration })
    },

    getTimeSlotsHost: (uuid) => {
        return fetchData(basicUrl + "host/" + uuid, GET)
    },

    updateTimeSlotsHost: (uuid, timeSlots) => {
        return fetchData(basicUrl + "host/" + uuid, PUT, { timeSlots: timeSlots })
    }

}