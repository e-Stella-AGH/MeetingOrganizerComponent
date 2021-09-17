# e-stella-meeting-organizer

> Library for usage of e-Stella MeetingOrganizer API

[![NPM](https://img.shields.io/npm/v/e-stella-meeting-organizer.svg)](https://www.npmjs.com/package/e-stella-meeting-organizer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save e-stella-meeting-organizer
```

## Usage

```jsx
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
  return <MeetingOrganizer userData={ { userType: 'job_seeker', uuid: '8380a212-3e29-430b-9d13-a752036ba6c4' } } />
}

export default App
```

## License

MIT © [e-Stella-AGH](https://github.com/e-Stella-AGH)
