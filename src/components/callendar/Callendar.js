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

const locales = {
  'en-US': enUS
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
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


export const EStellaCalendar = ({ calendarStyle, userData }) => {

    const [slots, setSlots] = useState([])
    const [reload, setReload] = useState(false)

    const functionSource = userData?.userType === "host" ? hostFunctions : jobSeekerFunctions

    const handleSelectSlot = (slotInfo) => {
        functionSource.onSelectSlot(slotInfo, reload, setReload, slots, userData)
    }

    const handleEventDeletion = (event) => {
        functionSource.onDoubleClickEvent(event, slots, setSlots)
    }

    useEffect(() => {
        functionSource.getSlots(userData.uuid, setSlots)
    }, [reload])

    const minTime = new Date()
    minTime.setHours(8, 0, 0)
    const maxTime = new Date()
    maxTime.setHours(20, 0, 0)

    return (
        <div>
            <Calendar
                localizer={localizer}
                style={calendarStyle}
                events={parseToEvents(slots, functionSource.getEventTitle())}
                selectable
                onSelectSlot={handleSelectSlot}
                defaultView='week'
                max={maxTime}
                min={minTime}
                onDoubleClickEvent={handleEventDeletion}
            />
        </div>
    )
}

EStellaCalendar.defaultProps = {
    calendarStyle: {height: 800}
}