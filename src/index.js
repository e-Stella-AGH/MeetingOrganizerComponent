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

export const MeetingOrganizer = ({ outsideAuthenticator, meetingOrganizerBaseLink, userData, renderMeetingActions, theme }) => {

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

  const getUserView = (isValidJwt) => {
    if(userData?.userType === "job_seeker" || userData?.userType === "host") {
      return <EStellaCalendar userData={userData} />
    } 
    if(isValidJwt) {
      return <MeetingsMainView renderMeetingActions={renderMeetingActions} />
    }
    return loginView
  }

  const [view, setView] = useState(null)

  useEffect(() => {
    Swal.showLoading()
    jwt.isValid()
      .then(isValid => {
        setView(getUserView(isValid))
        Swal.close()
      })
  }, [])

  useEffect(() => {
    if (meetingOrganizerBaseLink) api.setUrl(meetingOrganizerBaseLink)
    if(outsideAuthenticator) {
      fetchUserData(outsideAuthenticator.baseLink, outsideAuthenticator.jwt)
        .then(data => console.log(data))
    }
  }, [])

  return (
    <div>
      { theme ? <ThemeProvider theme={theme}>
        {view}
      </ThemeProvider> : view }
    </div>
  )
}

MeetingOrganizer.propTypes = {
  outsideAuthenticator: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
    baseLink: PropTypes.string.isRequired
  })
}
