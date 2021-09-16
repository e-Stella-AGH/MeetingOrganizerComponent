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
  return <MeetingOrganizer userData={ { userType: 'job_seeker', uuid: '264665a1-53eb-40fc-b263-697b0bf88a79' } } />
}

export default App
