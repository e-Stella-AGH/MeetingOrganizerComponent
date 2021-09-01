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
        XD
      </ListItem>
    </>
  )
}

const App = () => {
  return <MeetingOrganizer userData={ { userType: 'host', uuid: 'fdd612f3-c0ba-4534-adca-737432b9cace' } } />
}

export default App
