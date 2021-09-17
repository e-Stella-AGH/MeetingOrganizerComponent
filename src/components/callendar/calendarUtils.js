import { api } from '../../utils/endpoints';
import Swal from 'sweetalert2'
import { joinSlots } from './findUnion';

export const showDate = (date) => 
    `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`

const getDifferenceInMinutes = (start, end) => {
    return Math.floor( (Math.abs(end - start)) / 1000 / 60)
}

export const hostFunctions = {
    getSlots: (uuid, setSlots) => {
        api.getTimeSlotsHost(uuid)
            .then(data => setSlots(data?.host?.TimeSlots || []))
    },

    onDoubleClickEvent: (event, slots, uuid, reload, setReload) => {
        const newSlots = slots.filter(slot => new Date(slot.startDatetime).toUTCString() !== event.start.toUTCString())
        Swal.fire({
            icon: 'warning',
            text: 'Are you sure you want to delete this meeting slot? This operation cannot be undone!',
            showCancelButton: true
        }).then(result => {
            if(result.isConfirmed) {
                api.updateTimeSlotsHost(uuid, newSlots)
                    .then(data => setReload(!reload))
            }
        })
    },

    onSelectSlot: (slotInfo, reload, setReload, slots, userData) => {
        Swal.fire({
            icon: 'question',
            html: `You are going to set a new slot for interviews: <strong>${showDate(slotInfo.start)}</strong> - <strong>${showDate(slotInfo.end)}</strong>. Are you sure?`,
            showCancelButton: true
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

export const jobSeekerFunctions = (outerOnPickSlot) => {
    return {
        getSlots: (uuid, setSlots) => {
            api.getTimeSlotsGuest(uuid)
                .then(data => setSlots(data?.timeSlots))
        },

        onDoubleClickEvent: (event, slots, setSlots) => {
            const duration = getDifferenceInMinutes(event.start, event.end)
            Swal.fire({
                icon: 'question',
                text: `Are you sure you want to pick this slot? You won't be able to change it by our system!`
            }).then(result => {
                if(result.isConfirmed) {
                    api.selectMeetingByGuest({ startTime: event.start, duration: duration })
                    outerOnPickSlot({ startTime: event.start, duration: duration })
                }
            })
        },

        //he cannot do it
        onSelectSlot: () => {},

        getEventTitle: () => "Double click to  pick this interview!"
    }
}