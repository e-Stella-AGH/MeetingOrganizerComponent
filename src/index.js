import React, { useEffect, useState } from 'react'
import { Login } from './components/auth/login'
import PropTypes from 'prop-types'
import { api, fetchUserData } from './utils/endpoints'
import { Register } from './components/auth/Register'
import { EStellaCalendar } from './components/Callendar'
import { MeetingsMainView } from './components/meetings/MeetingsMainView'
import { jwt } from './utils/jwtApi';

console.warn = console.error = () => {};

export const MeetingOrganizer = ({ outsideAuthenticator, meetingOrganizerBaseLink, userData, renderMeetingActions }) => {

  const loginView = (<Login redirectToRegister={() => setView(registerView)} login={(credentials) => {
    api.login(credentials)
      .then(data => {
        jwt.set(data.msg)
        setView(<MeetingsMainView renderMeetingActions={renderMeetingActions} />)
      })
  }}/>)

  const registerView = (<Register redirectToLogin={() => setView(loginView)} register={(credentials) => {
    api.register(credentials)
      .then(_ => setView(loginView))
  }} />)

  const getUserView = () => {
    if(userData?.userType === "job_seeker" || userData?.userType === "host") {
      return <EStellaCalendar userData={userData} />
    } 
    if(jwt.isPresent()) {
      return  <MeetingsMainView renderMeetingActions={renderMeetingActions} />
    }
    return loginView
  }

  const [view, setView] = useState(getUserView)

  useEffect(() => {
    if (meetingOrganizerBaseLink) api.setUrl(meetingOrganizerBaseLink)
    if(outsideAuthenticator) {
      fetchUserData(outsideAuthenticator.baseLink, outsideAuthenticator.jwt)
        .then(data => console.log(data))
    }
  }, [])

  return (
    <div>
      {view}
    </div>
  )
}

MeetingOrganizer.propTypes = {
  outsideAuthenticator: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
    baseLink: PropTypes.string.isRequired
  })
}
