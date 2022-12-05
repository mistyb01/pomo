import React, { useState, useEffect } from 'react'

function Timer({minSecs}) {
    // referenced bhargav bagina's code: https://medium.com/bb-tutorials-and-thoughts/how-to-create-a-countdown-timer-in-react-app-e99916046292

    
    // setting initial values of minutes and seconds to be what was passed into minSecs prop
    const {mins = 0, secs = 0} = minSecs;

    const [[currMins, currSecs], setTime] = useState([mins, 0]);

    const tick = () => {
        if (currMins === 0 && currSecs === 0) {
            reset()
        } else if (currSecs === 0) {
            setTime([currMins - 1, 59]);
        } else {
            setTime([currMins, currSecs - 1]);
        }
        console.log(currMins, currSecs);
    };

    const reset = () => setTime([parseInt(mins), parseInt(secs)]);

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    })

    return (
        <>
            <span>25:00</span>
            <div className="buttons">
                <button>play</button>
            </div>
        </>
    );
}

export default Timer;