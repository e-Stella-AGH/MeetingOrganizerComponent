import React from 'react';
import { LoginLayout } from './layout';
import { api } from '../../utils/endpoints'

export function Login(props) {

    const handleLogin = (data) => {
        api.login(data.email, data.password)
            .then(result => console.log("Login properly"))
            .catch(error => alert(error))
    }

    return (
        <LoginLayout buttonText="Login" handleClose={handleLogin} />
    )
}