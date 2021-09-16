import { api } from '../../utils/endpoints';
import Swal from 'sweetalert2'
import { joinSlots } from './findUnion';

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
        const newSlots = slots.filter(slot => new Date(slot.startDatetime).toUTCString() !== event.start.toUTCString())
        setSlots(newSlots)
        //request
    },

    onSelectSlot: (slotInfo, reload, setReload, slots, userData) => {
        Swal.fire({
            icon: 'question',
            html: `You are going to set a new slot for interviews: <strong>${showDate(slotInfo.start)}</strong> - <strong>${showDate(slotInfo.end)}</strong>. Are you sure?`
        }).then(result => {
            if(result.isConfirmed) {
                const newSlots = slots.map(slot => {
                    return {
                        ...slot,
                        startDatetime: new Date(slot.startDatetime)
                    }
                })
                const unionSlots = joinSlots([...newSlots, { startDatetime: slotInfo.start, duration: getDifferenceInMinutes(slotInfo.start, slotInfo.end) }])
                api.updateTimeSlotsHost(userData.uuid, unionSlots)
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
        //duration jeszcze
        const duration = getDifferenceInMinutes(event.start, event.end)
        api.selectMeetingByGuest({ startTime: event.start, duration: duration })
    },

    //he cannot do it XD
    onSelectSlot: () => {},

    getEventTitle: () => "Double click to  pick this interview!"
}