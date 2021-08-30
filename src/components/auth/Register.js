import { Auth } from './Auth'
import React from 'react'

export const Register = ({ redirectToLogin, register }) => {

  const handleSubmit = (credentials) => {
    register(credentials)
  }

  return (
    <Auth handleSubmitProp={handleSubmit} welcomeText="Welcome!" ctaText="Register" ghostText="Already have an account?" redirect={redirectToLogin} />
  )
}
