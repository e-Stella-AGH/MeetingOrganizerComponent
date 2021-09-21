import React from 'react'
import { Chip, Avatar } from '@material-ui/core'

export const HostsList = ({ hosts, onDelete, center }) => {

    const style = center ? { justifyContent: 'center' } : {}

    return(
        <div style={{display: 'flex', flexFlow: 'row wrap', gap: '10px', ...style}}>
            { hosts.map(host => (<Chip avatar={<Avatar>{host[0].toUpperCase()}</Avatar>} label={host} color="primary" onDelete={onDelete ? () => onDelete(host) : undefined} />)) }
        </div>
    )
}