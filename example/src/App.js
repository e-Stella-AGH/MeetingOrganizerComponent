import React from 'react'
import { ListItem, ListItemIcon, Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { MeetingOrganizer } from 'e-stella-meeting-organizer'
import 'e-stella-meeting-organizer/dist/index.css'

const renderMeetingActions = () => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
            <Button>
                <AddCircleOutlineIcon fontSize="large" color="action" />
            </Button>
        </ListItemIcon>
      </ListItem>
      <ListItem>
        Sample Meeting Action
      </ListItem>
    </>
  )
}

const App = () => {
  return <MeetingOrganizer userData={ { userType: 'job_seeker', uuid: "bb86c4d4-3422-4f88-8d51-f3527e47276a" } }
    outerFunctions = {{onCreateMeeting: (meeting) => console.log(meeting), onPickSlot: (slot) => console.log(slot)}}
  />
}

export default App
