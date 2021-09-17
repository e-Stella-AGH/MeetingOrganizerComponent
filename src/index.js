import React, { useEffect, useState } from 'react'
import { Login } from './components/auth/login'
import PropTypes from 'prop-types'
import { api, fetchUserData } from './utils/endpoints'
import { Register } from './components/auth/Register'
import { EStellaCalendar } from './components/callendar/Callendar'
import { MeetingsMainView } from './components/meetings/MeetingsMainView'
import { jwt } from './utils/jwtApi';
import Swal from 'sweetalert2';

console.warn = console.error = () => {};

export const MeetingOrganizer = ({ outsideJwt, meetingOrganizerBaseLink, userData, renderMeetingActions, theme, outerFunctions, showLogout, drawerStyle }) => {

  const loginView = (<Login redirectToRegister={() => setView(registerView)} login={(credentials) => {
    api.login(credentials)
      .then(data => {
        jwt.set(data.msg)
        setView(<MeetingsMainView renderMeetingActions={renderMeetingActions} />)
      })
  }}/>)

  const registerView = (<Register redirectToLogin={() => setView(loginView)} register={(credentials) => {
    if(credentials.password != credentials.repeatedPassword) {
      Swal.fire({
        title: 'Error',
        text: `Passwords don't match`,
        icon: 'error'
      })
    } else {
      api.register(credentials)
        .then(_ => setView(loginView))
    }
  }} />)

  const emptyFunction = () => {}

  const getUserView = (isValidJwt) => {
    if(userData?.userType === "job_seeker" || userData?.userType === "host") {
      return <EStellaCalendar userData={userData} outerOnPickSlot={outerFunctions?.onPickSlot || emptyFunction} />
    } 
    if(isValidJwt) {
      return <MeetingsMainView renderMeetingActions={renderMeetingActions} showLogout={!!showLogout} drawerStyle={drawerStyle} />
    }
    return loginView
  }

  useEffect(() => {
    if(outsideJwt) {
      api.registerFromIntegration(outsideJwt)
        .then(data => {
          jwt.set(outsideJwt)
          Swal.close()
          setView(getUserView(true))
        })
    }
  }, [])

  const [view, setView] = useState(null)

  useEffect(() => {
    Swal.showLoading()
    if(!outsideJwt){
      jwt.isValid()
        .then(isValid => {
          setView(getUserView(isValid))
          Swal.close()
        })
    }
  }, [])

  if(meetingOrganizerBaseLink) api.setUrl(meetingOrganizerBaseLink)

  return (
    <div>
      { theme ? <ThemeProvider theme={theme}>
        {view}
      </ThemeProvider> : view }
    </div>
  )
}

MeetingOrganizer.propTypes = {
  outsideJwt: PropTypes.string,
  meetingOrganizerBaseLink: PropTypes.string,
  userData: PropTypes.exact({
    userType: PropTypes.oneOf(['job_seeker', 'host', 'organizer']).isRequired,
    uuid: PropTypes.string
  }),
  renderMeetingActions: PropTypes.func,
  outerFunctions: PropTypes.exact({
    onPickSlot: PropTypes.func.isRequired
  }),
  showLogout: PropTypes.bool,
  drawerStyle: PropTypes.object
}
