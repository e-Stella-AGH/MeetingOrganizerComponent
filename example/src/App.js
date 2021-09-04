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
  return <MeetingOrganizer userData={ { userType: 'host', uuid: '2322afac-7574-4ccc-9ed9-b8aaf552b595' } } />
}

export default App
