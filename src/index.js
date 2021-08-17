import React from 'react'
import { Login } from './elements/auth/login'
import { Register } from './elements/auth/register'
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>
    Example Component: {text}
    <Login />
    <Register />
  </div>
}
