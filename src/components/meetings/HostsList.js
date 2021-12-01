import React from 'react'
import { Chip, Avatar, Typography } from '@material-ui/core'

export const HostsList = ({ hosts, onDelete, center }) => {

    const style = center ? { justifyContent: 'center' } : {}

    return(
        <div style={{display: 'flex', flexFlow: 'row wrap', gap: '10px', ...style}}>
            { 
                hosts.length > 0 ?
                    hosts.map(host => (<Chip avatar={<Avatar>{host[0].toUpperCase()}</Avatar>} label={host} color="primary" onDelete={onDelete ? () => onDelete(host) : undefined} />))
                : <Typography variant="body1" color="textSecondary">Hosts you'll add will appear here. Click tick icon or select to add host.</Typography>
            }
        </div>
    )
}