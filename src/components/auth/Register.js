import { Auth } from './Auth'
import React from 'react'

export const Register = ({ redirectToLogin, register }) => {

  const handleSubmit = (credentials) => {
    register(credentials)
  }

  return (
    <Auth handleSubmitProp={handleSubmit} welcomeText="Register" additionalText="With registering you can adding meetings and much more" ctaText="Register" ghostText="Already have an account?" redirect={redirectToLogin} />
  )
}
