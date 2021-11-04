import { TextField, Typography, IconButton } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { validateEmail } from '../../utils/utils'

export const AddGuest = ({ addGuest, defaultGuest }) => {

    const [current, setCurrent] = useState('')
    const [confirmed, setConfirmed] = useState(defaultGuest)

    const addCurrentGuest = () => {
        Swal.resetValidationMessage()
        if(!validateEmail(current)) {
            Swal.showValidationMessage('Guest must have a valid email!')
        } else {
            addGuest(current)
            setConfirmed(current)
        }
    }

    return (
        <div style={{minHeight: '50vh'}}>
            <Typography variant="h4">
                Add Guest
            </Typography>
            <div style={{marginTop: '2em'}}>
                <TextField
                    onChange={({ target }) => setCurrent(target.value)}
                    value={current}
                    label="Add Guest"
                    variant="outlined"
                />
                <IconButton onClick={addCurrentGuest}>
                    <DoneIcon />
                </IconButton>
                <Typography variant="h6" style={{marginTop: '2em'}}>Current guest: { confirmed }</Typography>
            </div>
        </div>
    )
}