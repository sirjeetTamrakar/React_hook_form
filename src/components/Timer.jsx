import React, {useState, useEffect} from 'react'

const Timer = () =>
{
    const [seconds, setSeconds] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [counter, setCounter] = useState()

    useEffect(() =>
    {
        const countDown = setInterval(() =>
        {
            const mins = Math.floor(counter/60)
            const secs = counter%60
            setMinutes(mins)
            setSeconds(secs)
            setCounter(counter - 1)
        }, 1000)
        return () => clearInterval(countDown)
    }, [counter])

    console.log(minutes)
    return (
        <div>
            <input type='number' onChange={ e => setCounter(e.target.value*60)}/>
            {minutes<10? '0'+minutes : minutes}:{seconds<10? '0'+seconds : seconds}
        </div>
    )
}

export default Timer
