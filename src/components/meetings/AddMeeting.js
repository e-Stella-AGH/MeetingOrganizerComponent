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

const fireSetDuration = (reload, setReload) => {
    MySwal.fire({
        ...basicSwal,
        text: "Add Duration in minutes",
        input: 'number'
    }).then(result => {
        if(result.isConfirmed) {
            setDuration(result.value)
            api.createMeeting({uuid: info['uuid'], hosts: info['hosts'], guest: info['guest'], duration: info['duration'] })
                .then(data => {
                    setReload(!reload)
                })
        }
    })
}

const fireSetGuest = (reload, setReload, meetingValues) => {
    MySwal.fire({
        ...basicSwal,
        html: <AddGuest addGuest={setGuest} defaultGuest={meetingValues?.guest || ''} />
    }).then(result => {
        if(result.isConfirmed) {
            fireSetDuration(reload, setReload)
        }
    })
}

export const addMeetingPath = (reload, setReload, meetingValues, allowedHostsMails) => {
    info['uuid'] = meetingValues.uuid
    info['hosts'] = meetingValues?.hosts || []
    info['guest'] = meetingValues?.guest || ''
    MySwal.fire({
        ...basicSwal,
        html: <AddHosts addHosts={setHosts} defaultHosts={meetingValues?.hosts || []} allowedHostsMails={allowedHostsMails} />
    }).then(result => {
        if(result.isConfirmed) {
            fireSetGuest(reload, setReload, meetingValues)
        }
    })
}
