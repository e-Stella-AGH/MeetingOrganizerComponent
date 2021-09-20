import React from 'react'

export const MeetingOrganizerDrawer = ({ renderMeetingActions, showLogout, addAction, drawerStyle }) => {

    return (
        <Drawer
                variant="permanent"
                style={{display: "flex", alignItems: "center"}}
            >
                <List style={{...drawerStyle}}>
                <ListItem>
                    <ListItemIcon>
                        <Button
                            onClick={addAction}
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
    )
}