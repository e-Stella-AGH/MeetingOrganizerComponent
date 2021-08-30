import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardTimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Typography } from '@material-ui/core'
import Swal from 'sweetalert2';

export const DateAddMeeting = ({ setDate }) => {

    const [selectedDate, setSelectedDate] = useState(null)

    const handleDateChange = (date) => {
        Swal.resetValidationMessage()
        if(date < new Date()) {
            Swal.showValidationMessage("Date of meeting cannot be earlier than now!")
        } else {
            setSelectedDate(date)
            setDate(date)
        }
    }

    return (
        <div style={{ margin: '1em', minHeight: '50vh'}}>
            <Typography variant="h4" style={{marginBottom: "2em"}}>When?</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{marginTop: '1em'}}
                />
                <KeyboardTimePicker
                    style={{marginTop: "1em"}}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
            <Typography variant="h6" style={{marginTop: '2em'}}>Current date: {selectedDate?.toLocaleString()}</Typography>
        </div>
    )
}