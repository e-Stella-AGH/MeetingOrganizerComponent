import React, { useState, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemIcon, Button, Divider, Modal } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { jwt } from '../../utils/jwtApi'
import { addMeetingPath } from './AddMeeting'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { api } from '../../utils/endpoints';
import { SingleMeeting } from './SingleMeeting'

export const MeetingsMainView = ({ userData, renderMeetingActions, showLogout, onCreate }) => {

    const [meetings, setMeetings] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        api.getMeetingsByOrganizer()
            .then(data => setMeetings(data?.msg || []))
    }, [reload])

    const getMeetings = () => meetings.map(meeting => (
        <SingleMeeting key={meeting.uuid} meeting={meeting} reload={reload} setReload={setReload}/>
    ))

    return (
        <div>
            <div style={{marginLeft: '20%', display: 'flex', marginTop: '1em', flexFlow: 'row wrap', gap: '1em'}}>
                {getMeetings()} 
            </div> 
            <Drawer
                variant="permanent"
                style={{display: "flex", alignItems: "center"}}
            >
                <List>
                <ListItem>
                    <ListItemIcon>
                        <Button
                            onClick={() => addMeetingPath(reload, setReload, onCreate)}
                        >
                            <AddCircleOutlineIcon fontSize="large" color="action" />
                        </Button>
                    </ListItemIcon>
                </ListItem>
                </List>
                <Divider />
                <List>
                    {renderMeetingActions?.()}
                </List>
                { showLogout && (<div>
                <Divider />
                <List>
                    <ListItem>
                        <Button onClick={() => {jwt.remove(); window.location.reload()}}>
                            <ExitToAppIcon fontSize="large" color="action"/>
                        </Button>
                    </ListItem>
                </List>
                </div>)}
            </Drawer>
        </div>
    )
}