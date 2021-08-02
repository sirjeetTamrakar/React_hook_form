import React from 'react'

const Input = ({type, placeholder, inputvalue, setvalue}) => {
    return (
        <input type={type} placeholder={placeholder} value={inputvalue} onChange={e => setvalue(e.target.value)}/>
    )
}

export default Input
