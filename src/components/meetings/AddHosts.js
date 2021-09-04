import React, { useState } from 'react'
import { TextField, IconButton, Chip, Avatar, Typography } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import { validateEmail } from '../../utils/utils'
import Swal from 'sweetalert2'
import { HostsList } from './HostsList'

export const AddHosts = ({ addHosts }) => {


    const [hosts, setHosts] = useState([])
    const [currentHost, setCurrentHost] = useState('')

    const handleHostDelete = (hostMail) => {
        const newHosts = hosts.filter(host => host !== hostMail)
        addHosts(newHosts)
        setHosts(newHosts)
    }

    const addCurrentHost = () => {
        Swal.resetValidationMessage()
        if(!validateEmail(currentHost)) {
            Swal.showValidationMessage("Host must have a valid email!")
        } else {
            addHosts([...hosts, currentHost])
            setHosts([...hosts, currentHost])
            setCurrentHost('')
        }
    }

    return (
        <div style={{minHeight: "50vh"}}>
            <Typography variant="h4" style={{marginBottom: "3em"}}>Add hosts</Typography>
            <TextField
                variant="outlined"
                label="Add host"
                onChange={({ target }) => setCurrentHost(target.value)}
                value={currentHost}
            />
            <IconButton onClick={addCurrentHost}>
                <DoneIcon />
            </IconButton>
            <div style={{marginTop: '2em'}}>
                <HostsList hosts={hosts} onDelete={(host) => handleHostDelete(host)} />
            </div>
        </div>
    )
}