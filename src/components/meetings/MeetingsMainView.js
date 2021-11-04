import React, { useState, useEffect } from 'react'
import { SingleMeeting } from './SingleMeeting'
import { MeetingOrganizerDrawer } from '../Drawer'
import { api } from '../../utils/endpoints';
import { addMeetingPath } from './AddMeeting'
import { EmptyState } from './EmptyState'

export const MeetingsMainView = ({ renderMeetingActions, showLogout, drawerStyle: outerDrawerStyle, meetingValues }) => {

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

    return (
        <div>
            { meetings.length > 0 ?
                <div style={{ marginLeft: '20%', display: 'flex', marginTop: '1em', flexFlow: 'row wrap', gap: '1em' }}>
                    {getMeetings()}
                </div>
                : <EmptyState reload={reload} setReload={setReload} meetingValues={meetingValues} />
            }
            <MeetingOrganizerDrawer
                addAction={() => addMeetingPath(reload, setReload, meetingValues)}
                renderMeetingActions={renderMeetingActions}
                showLogout={showLogout}
                drawerStyle={drawerStyle}
            />
        </div>
    )
}