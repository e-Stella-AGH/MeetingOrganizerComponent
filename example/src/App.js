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
  return <MeetingOrganizer userData={{ userType: 'hr', uuid: "0d59eb42-8805-49de-a90e-50ef805eb1ec" }}
    outerFunctions={{ onPickSlot: (slot) => console.log(slot) }}
    outsideMeetingValues={{ hosts: ['t@t.com', 'dev@dev.com'], guest: 'xd@xd.com', uuid: "0d59eb42-8805-49de-a90e-50ef805eb1ec"}}
    allowedHostsMails={['xd@xd.com', 'xd2@xd2.com']}
  />
}

export default App
