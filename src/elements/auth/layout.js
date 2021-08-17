import { Button, Container, TextField } from '@material-ui/core';
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react';

export function LoginLayout({ buttonText, handleClose }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        console.log(email, password)
        handleClose({ email: email, password: password })
    }


    return (
        <form id="login-form" name="login-form" onSubmit={handleSubmit}>
            <TextField id="login" label="Login" required value={email} onChange={e => setEmail(e.target.value)} />
            <TextField id="password" label="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit">{buttonText}</Button>
        </form>
    )
}


LoginLayout.propTypes = {
    buttonText: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
}