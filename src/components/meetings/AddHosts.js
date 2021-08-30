import React, { useState } from 'react'
import { TextField, IconButton, Chip, Avatar, Typography } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import { validateEmail } from '../../utils/utils'
import Swal from 'sweetalert2'

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

    const getHosts = () => hosts.map(host => (<Chip avatar={<Avatar>{host[0]}</Avatar>} label={host} color="primary" onDelete={() => handleHostDelete(host)} />))

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
            <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', marginTop: '2em'}}>
                {getHosts()}
            </div>
        </div>
    )
}