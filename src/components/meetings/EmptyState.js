import React from 'react'
import { addMeetingPath } from './AddMeeting'
import { Typography, Button } from '@material-ui/core'

export const EmptyState = ({ addMeetingPath }) => {

    return (
        <div style={{marginLeft: 'auto', marginRight: 'auto', width: '70%', textAlign: 'center'}}>
            <img width="800" src="https://www.sindetelco.pt/wp-content/uploads/2019/10/reuniao.jpg" alt="People around the table" />
            <Typography variant="h5">Oh no! Looks like you don't have any meetings!</Typography>
            <Button color="primary" onClick={addMeetingPath} size="large" variant="contained" style={{marginTop: '2em'}}>Create one now</Button>
        </div>
    )
}