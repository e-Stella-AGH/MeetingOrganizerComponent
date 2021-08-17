import React from 'react';
import { LoginLayout } from './layout';
import { api } from '../../utils/endpoints'

export function Register(props) {

    const handleRegister = (data) => {
        api.register(data.email, data.password)
            .then(result => console.log("Register properly"))
            .catch(error => alert(error))

    }

    return (
        <LoginLayout buttonText="Register" handleClose={handleRegister} />
    )
}