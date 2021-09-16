import React from 'react'
import { Card, CardContent, Typography, Divider, Chip, Avatar, CardActions, Button } from '@material-ui/core'
import { HostsList } from './HostsList'
import Swal from 'sweetalert2';
import { api } from '../../utils/endpoints'

export const SingleMeeting = ({ meeting, reload, setReload }) => {

    const deleteMeeting = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: 'warning',
            text: "Are you sure you want to delete this meeting?"
        }).then(result => {
            if(result.isConfirmed) {
                Swal.showLoading()
                api.deleteMeetingByUuid(meeting.uuid)
                    .then(data => setReload(!reload))
            }
        })
    }

    return (
        <Card variant="outlined" style={{padding: '2em'}}>
            <CardContent>

                <Typography variant="h5">Meeting: {meeting.uuid.slice(0, 8)}</Typography>
                <Divider style={{marginTop: '1em', marginBottom: '1em'}} />

                <Typography variant="h6">Guest:</Typography>
                <Chip avatar={<Avatar>{meeting?.Guest?.email[0]?.toUpperCase()}</Avatar>} label={meeting?.Guest?.email} color="secondary" />

                <Divider style={{marginTop: '1em', marginBottom: '1em'}} />

                <Typography variant="h6">Hosts:</Typography>
                <HostsList hosts={meeting.Hosts.map(host => host.email)} />

                <Divider style={{marginTop: '1em', marginBottom: '1em'}} />
            </CardContent>
            <CardActions style={{float: 'right'}}>
                <Button variant="outlined" onClick={deleteMeeting}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}