import { Card, CardContent, TextField, Box, Avatar, Typography, CardActions, Button } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useState } from 'react'

export const Auth = ({handleSubmitProp, welcomeText, ctaText, ghostText, redirect }) => {
  const matches = useMediaQuery('(min-width:720px)')
  const style = !matches ? {width: "90%"} : {width: "40%"}
  const buttonStyle = !matches ? {width: "100%"} : {}
  
  const [credentials, setCredentials] = useState({email: '', password: ''})

  const handleEmailChange = ({ target }) => {
    setCredentials({...credentials, email: target.value.trim()})
  }

  const handlePassChange = ({ target }) => {
    setCredentials({...credentials, password: target.value})
  }

  const handleSubmit = () => {
    handleSubmitProp(credentials)
  }

  return (
    <Card
      style={{...style, marginLeft: "auto", marginRight: "auto", marginTop: "5em", paddingTop: "3em", paddingBottom: "5em"}}
      variant="outlined"
    >
      <Box m={2} mb={4} style={{display: "flex", justifyContent: "center"}}>
        <Avatar
          src="https://i.imgur.com/Rdmsj15.jpg"
          style={{width: "6em", height: "6em"}}
        />
      </Box>
      <Box m={2} style={{textAlign: "center"}}>
        <Typography variant="h4">{welcomeText}</Typography>
      </Box>
      <CardContent style={{display: "block", width: "70%", marginLeft: "auto", marginRight: "auto"}}>
        <Box m={2}><TextField variant="outlined" label="E-mail" fullWidth value={credentials.email} onChange={handleEmailChange}/></Box>
        <Box m={2}><TextField variant="outlined" label="Password" fullWidth type="password" value={credentials.password} onChange={handlePassChange}/></Box>
      </CardContent>
      <Box m={2} mt={0}>
        <CardActions style={{float: "right", marginRight: "15%"}}>
            <Button color="primary" variant="contained" style={{...buttonStyle}} onClick={handleSubmit}>{ctaText}</Button>
        </CardActions>
        <Box style={{marginLeft: "16%", display: "inline-block"}} mt={1}>
          <Button color="primary" variant="outlined" style={{...buttonStyle}} onClick={redirect}>{ghostText}</Button>
        </Box>
      </Box>
    </Card>
  )
}