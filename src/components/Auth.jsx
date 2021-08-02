import React, { useState, useEffect } from 'react'
import Input from './Input'

const Auth = ({token, setToken, user, setUser}) =>
{
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() =>
    {
        localStorage.setItem('auth_token', token)
    }, [token])

    
    const handleSubmit = () =>
    {
        setToken('authorization_token')
    }

    const handleLogOut = () =>
    {
        localStorage.clear()
        setToken('')
    }

    return (
        <div>
            {token ?
                <>
                    <button type='button' onClick={handleLogOut}>Log Out</button>
                    <h2>You are logged in!</h2>
                </>
                :
                <>
                    <button type='button' onClick={handleSubmit}>Log In</button>
                    <h2>Please Log In.</h2>
                </>
            }
        </div>
    )
}

export default Auth
