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
  return <MeetingOrganizer userData={ { userType: 'typ', uuid: "eb4c592a-1e75-41f9-aef1-7c8e281fac28"} }
    outerFunctions = {{onPickSlot: (slot) => console.log(slot)}} outsideMeetingUUID="2538347c-b7d2-49bf-9ba2-5ab6f780964e"
  />
}

export default App
