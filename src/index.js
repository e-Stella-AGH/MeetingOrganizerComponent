import React, { useEffect, useState } from 'react'
import { Login } from './components/auth/login'
import PropTypes from 'prop-types'
import { api, fetchUserData } from './utils/endpoints'
import { Register } from './components/Register'

export const MeetingOrganizer = ({ outsideAuthenticator, meetingOrganizerBaseLink }) => {

  const loginView = (<Login redirectToRegister={() => setView(registerView)} login={(credentials) => {
    api.login(credentials)
      .then(data => console.log(data))
  }}/>)
  const registerView = (<Register redirectToLogin={() => setView(loginView)} register={(credentials) => api.register(credentials)} />)

  const [view, setView] = useState(loginView)

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
