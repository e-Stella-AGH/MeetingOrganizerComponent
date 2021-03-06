import React, { useState } from 'react'
import { TextField, IconButton, Chip, Avatar, Typography } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import { validateEmail } from '../../utils/utils'
import Swal from 'sweetalert2'
import { HostsList } from './HostsList'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export const AddHosts = ({ addHosts, defaultHosts, allowedHostsMails }) => {

    const [hosts, setHosts] = useState(defaultHosts)
    const [currentHost, setCurrentHost] = useState('')
    const [selectValue, setSelectValue] = useState('')

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

    const handleSelectChange = ({ target }) => {
        const currentHost = target.value
        addHosts([...hosts, currentHost])
        setHosts([...hosts, currentHost])
        setSelectValue('')
    }

    const getInput = () => allowedHostsMails ? (
        <div>
            <InputLabel id="hosts-label" style={{marginBottom: '10px'}}>Host Mail</InputLabel>
            <Select labelId="hosts-label" onChange={handleSelectChange} value={selectValue} style={{width: "80%"}}>
                {allowedHostsMails.map(allowedHostMail => (<MenuItem key={allowedHostMail} value={allowedHostMail}>{allowedHostMail}</MenuItem>))}
            </Select>
        </div>
    )
    : (
    <div><TextField
        variant="outlined"
        label="Add host"
        onChange={({ target }) => setCurrentHost(target.value)}
        value={currentHost}
    />
    <IconButton onClick={addCurrentHost}>
            <DoneIcon />
        </IconButton>
    </div>)

    return (
        <div style={{minHeight: "50vh"}}>
            <Typography variant="h4" style={{marginBottom: "3em"}}>Add hosts by mail</Typography>
            {getInput()}
            <div style={{marginTop: '2em'}}>
                <HostsList hosts={hosts} onDelete={(host) => handleHostDelete(host)} center />
            </div>
        </div>
    )
}