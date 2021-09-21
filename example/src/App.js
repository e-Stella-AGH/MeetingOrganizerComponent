import React from 'react'
import { ListItem, ListItemIcon, Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { MeetingOrganizer } from 'e-stella-meeting-organizer'

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
  return <MeetingOrganizer userData={{ userType: 'job_seeker', uuid: "0d59eb42-8805-49de-a90e-50ef805eb1ec" }}
    outerFunctions={{ onPickSlot: (slot) => console.log(slot) }}
  />
}

export default App
