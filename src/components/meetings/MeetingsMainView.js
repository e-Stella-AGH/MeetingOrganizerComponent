import React, { useState, useEffect } from 'react'
import { SingleMeeting } from './SingleMeeting'
import { MeetingOrganizerDrawer } from '../Drawer'
import { api } from '../../utils/endpoints';
import { addMeetingPath } from './AddMeeting'
import { EmptyState } from './EmptyState'

export const MeetingsMainView = ({ renderMeetingActions, showLogout, drawerStyle: outerDrawerStyle, meetingValues, allowedHostsMails }) => {

    const [meetings, setMeetings] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        api.getMeetingsByOrganizer()
            .then(data => setMeetings(data?.msg || []))
    }, [reload])

    const drawerStyle = outerDrawerStyle || {}

    const getMeetings = () => meetings.map(meeting => (
        <SingleMeeting key={meeting.uuid} meeting={meeting} reload={reload} setReload={setReload} />
    ))

    const addAction = () => addMeetingPath(reload, setReload, meetingValues, allowedHostsMails)

    return (
        <div>
            { meetings.length > 0 ?
                <div style={{ marginLeft: '20%', display: 'flex', marginTop: '1em', flexFlow: 'row wrap', gap: '1em' }}>
                    {getMeetings()}
                </div>
                : <EmptyState addMeetingPath={addAction} />
            }
            <MeetingOrganizerDrawer
                addAction={addAction}
                renderMeetingActions={renderMeetingActions}
                showLogout={showLogout}
                drawerStyle={drawerStyle}
            />
        </div>
    )
}