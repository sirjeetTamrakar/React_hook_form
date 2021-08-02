import React from 'react'
import {withRouter} from 'react-router-dom'

const Account = () => {
    return (
        <div>
            <h1>Accounts Page</h1>
            <h3>You are logged in.</h3>
        </div>
    )
}

export default withRouter(Account)
