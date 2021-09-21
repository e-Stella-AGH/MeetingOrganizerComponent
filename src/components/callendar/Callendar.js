import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { api } from '../../utils/endpoints';
import Swal from 'sweetalert2';
import { hostFunctions, jobSeekerFunctions } from './calendarUtils';
import { MeetingOrganizerDrawer } from '../Drawer';

const locales = {
    'en-US': enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => {
        return startOfWeek(new Date(), { weekStartsOn: 1 });
    },
    getDay,
    locales,
})

const parseToEvents = (timeSlots, title) => timeSlots.map(timeSlot => {
    const start = new Date(timeSlot.startDatetime)
    const end = new Date(start.getTime() + Number(timeSlot.duration * 60 * 1000))
    return {
        title: title,
        start: start,
        end: end
    }
})


export const EStellaCalendar = ({ calendarStyle, userData, outerOnPickSlot, drawerStyle: outerDrawerStyle }) => {

    const [slots, setSlots] = useState([])
    const [reload, setReload] = useState(false)

    const functionSource = userData?.userType === "host" ? hostFunctions : jobSeekerFunctions(outerOnPickSlot)

    const handleSelectSlot = (slotInfo) => {
        functionSource.onSelectSlot(slotInfo, reload, setReload, slots, userData)
    }

    const handleEventDoubleClick = (event) => {
        functionSource.onDoubleClickEvent(event, slots, userData.uuid, reload, setReload)
    }

    const drawerStyle = outerDrawerStyle || {}

    useEffect(() => {
        functionSource.getSlots(userData.uuid, setSlots)
    }, [reload])

    const minTime = new Date()
    minTime.setHours(8, 0, 0)
    const maxTime = new Date()
    maxTime.setHours(20, 0, 0)

    const askForMoreSlots = () => {
        Swal.fire({
            title: 'Do you want to ask hosts for more slots?',
            icon: 'question',
            text: `Please, consider if you can pick one of possible slots, so we won't need to bother hosts.`,
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                api.askForMoreSlots(userData.uuid)
                    .then(res => {
                        Swal.fire({
                            text: "We've asked hosts to add more meetings! Check of this page in few days to see if they added slots, if not, please bother them some more.",
                            icon: 'success'
                        })
                    })
            }
        })
    }

    const userTypeStyle = userData?.userType === "job_seeker" ? { marginLeft: "10%" } : {}

    return (
        <div>
            {
                userData?.userType === "job_seeker" && <MeetingOrganizerDrawer
                    drawerStyle={drawerStyle}
                    addAction={askForMoreSlots}
                />
            }
            <Calendar
                localizer={localizer}
                style={{ ...calendarStyle, ...userTypeStyle }}
                events={parseToEvents(slots, functionSource.getEventTitle())}
                selectable
                onSelectSlot={handleSelectSlot}
                defaultView='week'
                max={maxTime}
                min={minTime}
                onDoubleClickEvent={handleEventDoubleClick}
            />
        </div>
    )
}

EStellaCalendar.defaultProps = {
    calendarStyle: { height: 800 }
}