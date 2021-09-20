import React, { useState, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemIcon, Button, Divider, Modal } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { jwt } from '../../utils/jwtApi'
import { addMeetingPath } from './AddMeeting'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { api } from '../../utils/endpoints';
import { SingleMeeting } from './SingleMeeting'
import { MeetingOrganizerDrawer } from '../Drawer'

export const MeetingsMainView = ({ renderMeetingActions, showLogout, drawerStyle: outerDrawerStyle, meetingUUID }) => {

    const [meetings, setMeetings] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        api.getMeetingsByOrganizer()
            .then(data => setMeetings(data?.msg || []))
    }, [reload])

    const drawerStyle = outerDrawerStyle || {}

    const getMeetings = () => meetings.map(meeting => (
        <SingleMeeting key={meeting.uuid} meeting={meeting} reload={reload} setReload={setReload}/>
    ))

    return (
        <div>
            <div style={{marginLeft: '20%', display: 'flex', marginTop: '1em', flexFlow: 'row wrap', gap: '1em'}}>
                {getMeetings()} 
            </div> 
            <MeetingOrganizerDrawer
                addAction={() => addMeetingPath(reload, setReload, meetingUUID)}
                renderMeetingActions={renderMeetingActions}
                showLogout={showLogout}
                drawerStyle={drawerStyle}
            />
        </div>
    )
}