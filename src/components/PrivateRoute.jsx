import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({token, component:Component, ...rest}) => {
    return (
        <>
            <Route {...rest} render={(props) =>
            {
                if (token)
                {
                    return <Component/>
                }
                else{
                    return <Redirect to={{pathname:'/', state:{from: props.location}}}/>
                }
            }}
            />
        </>
    )
}

export default PrivateRoute
