import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { api } from '../utils/endpoints';
import Swal from 'sweetalert2';

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

const parseToEvents = (timeSlots) => timeSlots.map(timeSlot => {
    const start = new Date(timeSlot.startDatetime)
    const end = new Date(start.getTime() + Number(timeSlot.duration * 60 * 1000))
    return {
        title: 'Possible interview slot',
        start: start,
        end: end
    }
})

const showDate = (date) => 
    `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`

const getDifferenceInMinutes = (start, end) => {
    return Math.floor( (Math.abs(end - start)) / 1000 / 60)
}

export const EStellaCalendar = ({ calendarStyle, userData }) => {

    const [slots, setSlots] = useState([])
    const [reload, setReload] = useState(false)
    console.log(parseToEvents(slots))

    const handleSelectSlot = (slotInfo) => {
        Swal.fire({
            icon: 'question',
            html: `You are going to set a new slot for interviews: <strong>${showDate(slotInfo.start)}</strong> - <strong>${showDate(slotInfo.end)}</strong>. Are you sure?`
        }).then(result => {
            if(result.isConfirmed) {
                api.updateTimeSlotsHost(userData.uuid, [...slots, { startDatetime: slotInfo.start, duration: getDifferenceInMinutes(slotInfo.start, slotInfo.end) }])
                    .then(data => setReload(!reload))
            }
        })
    }

    const handleEventDeletion = (event) => {
        console.log(event)
        console.log(slots)
        slots.filter(slot => new Date(slot.startDatetime) !== event.start && (new Date(new Date(slot.startDatetime).getTime() + Number(slot.duration * 60 * 1000))) !== event.end)
        console.log(slots)
    }

    useEffect(() => {
        api.getTimeSlotsHost(userData.uuid)
            .then(data => setSlots(data.host.TimeSlots))
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
                events={parseToEvents(slots)}
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
    calendarStyle: {height: 600}
}