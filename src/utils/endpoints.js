import Swal from "sweetalert2";
import { jwt } from './jwtApi';

let basicUrl = "http://localhost:4000/"

const getHeader = (method, body = null) => {
    const headerWithoutBody = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'authorization': jwt.get()
        }
    }
    return body !== null ? { ...headerWithoutBody, body: JSON.stringify(body) } : headerWithoutBody
}

const POST = "POST"
const GET = "GET"
const PUT = "PUT"

const isCorrectResponseStatus = (status) => { return status >= 200 && status < 300 }

const fetchData = (url, method, body, title = "Getting data") => {
    let swal = new Swal({title: title})
    Swal.showLoading()
    return fetch(url, getHeader(method, body))
        .then(response => response.json())
        .then(response => {
            swal.close()
            Swal.fire({
                title: "Success",
                icon: "success"
            })
            console.log(response)
            if (isCorrectResponseStatus(response.status)) return response
            else throw response.msg
        })
        .catch(error => {
            swal.close()
            Swal.fire({
                title: "Something went wrong",
                text: error,
                icon: "error"
            })
            throw error
         })
}

export const api = {

    setUrl: (url) => {
        basicUrl = url
    },

    register: (credentials) => {
        return fetchData(basicUrl + "organizer/register", POST, { email: credentials.email, password: credentials.password })
    },

    login: (credentials) => {
        return fetchData(basicUrl + "organizer/login", POST, { email: credentials.email, password: credentials.password })
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
    },

    createMeeting: (body) => {
        console.log(body, jwt.get())
        return fetchData(basicUrl + 'meeting/', POST, body, "Creating meeting")
    }

}

export const fetchUserData = (baseLink, jwt) => {
  return fetch(baseLink + "/api/users/loggedInUser", {
    method: GET,
    headers: {
      "X-JWT": jwt
    }
  }).then(response => response.json())
}