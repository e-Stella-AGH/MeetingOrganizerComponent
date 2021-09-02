import { api } from '../../utils/endpoints';
import Swal from 'sweetalert2'

const showDate = (date) => 
    `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`

const getDifferenceInMinutes = (start, end) => {
    return Math.floor( (Math.abs(end - start)) / 1000 / 60)
}

export const hostFunctions = {
    getSlots: (uuid, setSlots) => {
        api.getTimeSlotsHost(uuid)
            .then(data => setSlots(data?.host?.TimeSlots || []))
    },

    onDoubleClickEvent: (event, slots, setSlots) => {
        const newSlots = slots.filter(slot => new Date(slot.startDatetime) !== event.start && (new Date(new Date(slot.startDatetime).getTime() + Number(slot.duration * 60 * 1000))) !== event.end)
        console.log(newSlots)
        setSlots(newSlots)
    },

    onSelectSlot: (slotInfo, reload, setReload, slots, userData) => {
        Swal.fire({
            icon: 'question',
            html: `You are going to set a new slot for interviews: <strong>${showDate(slotInfo.start)}</strong> - <strong>${showDate(slotInfo.end)}</strong>. Are you sure?`
        }).then(result => {
            if(result.isConfirmed) {
                api.updateTimeSlotsHost(userData.uuid, [...slots, { startDatetime: slotInfo.start, duration: getDifferenceInMinutes(slotInfo.start, slotInfo.end) }])
                    .then(data => setReload(!reload))
            }
        })
    },
    
    getEventTitle: () => "Possible interview slot"
}

export const jobSeekerFunctions = {
    getSlots: (uuid, setSlots) => {
        api.getTimeSlotsGuest(uuid)
            .then(data => setSlots(data?.timeSlots))
    },

    onDoubleClickEvent: (event, slots, setSlots) => {
        api.selectMeetingByGuest({ startTime: event.start })
    },

    //he cannot do it XD
    onSelectSlot: () => {},

    getEventTitle: () => "Double click to  pick this interview!"
}