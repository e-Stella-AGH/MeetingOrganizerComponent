import React, { useState, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemIcon, Button, Divider, Modal } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { jwt } from '../../utils/jwtApi'
import { addMeetingPath } from './AddMeeting'

export const MeetingsMainView = ({ userData, renderMeetingActions }) => {

    return (
        <div>
            
            <Drawer
                variant="permanent"
                style={{display: "flex", alignItems: "center"}}
            >
                <List>
                <ListItem>
                    <ListItemIcon>
                        <Button
                            onClick={() => addMeetingPath()}
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
            </Drawer>
        </div>
    )
}