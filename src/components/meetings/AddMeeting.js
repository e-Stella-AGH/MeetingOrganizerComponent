import React from 'react'
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { AddHosts } from './AddHosts'
import { AddGuest } from './AddGuest'
import { api } from '../../utils/endpoints'
import { jwt } from '../../utils/jwtApi'

const basicSwal = {
    title: 'Add new meeting',
    inputAttrubutes: {
        autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonColor: '#41A317',
    confirmButtonText: 'Next',
    allowOutsideClick: false
}

const MySwal = withReactContent(Swal)

const info = {}

const setHosts = (hosts) => {
    info['hosts'] = hosts
}
const setGuest = (guest) => {
    info['guest'] = guest
}
const setDuration = (duration) => {
    info['duration'] = Number(duration)
}

const fireSetDuration = () => {
    MySwal.fire({
        ...basicSwal,
        text: "Add Duration in minutes",
        input: 'number'
    }).then(result => {
        if(result.isConfirmed) {
            console.log(jwt.get())
            setDuration(result.value)
            api.createMeeting({ hosts: info['hosts'], guest: info['guest'], duration: info['duration'] })
        }
    })
}

const fireSetGuest = () => {
    MySwal.fire({
        ...basicSwal,
        html: <AddGuest addGuest={setGuest} />
    }).then(result => {
        if(result.isConfirmed) {
            fireSetDuration()
        }
    })
}

export const addMeetingPath = () => {
    MySwal.fire({
        ...basicSwal,
        html: <AddHosts addHosts={setHosts} />
    }).then(result => {
        if(result.isConfirmed) {
            fireSetGuest()
        }
    })
}
