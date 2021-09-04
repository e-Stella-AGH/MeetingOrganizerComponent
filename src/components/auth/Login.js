import { Auth } from './Auth'
import React from 'react'

export const Login = ({ redirectToRegister, login }) => {

  const handleSubmit = (credentials) => {
    login(credentials)
  }

  return (
    <Auth handleSubmitProp={handleSubmit} welcomeText="Log in now!" ctaText="login" ghostText="need an account?" redirect={redirectToRegister} />
  )
}
