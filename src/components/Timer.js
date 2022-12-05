import React, { useState, useEffect } from 'react'

function Timer({minSecs, breakMinSecs}) {
    // timer logic adapted from bhargav bachina's code: https://medium.com/bb-tutorials-and-thoughts/how-to-create-a-countdown-timer-in-react-app-e99916046292

    // setting initial values of minutes and seconds to be what was passed into minSecs prop
    const {startingMins = 0, startingSecs = 0} = minSecs;
    const {breakMins = 0, breakSecs = 0} = breakMinSecs;

    const [[currMins, currSecs], setTime] = useState([startingMins, startingSecs]);
    const [isActive, setActive] = useState(false);
    const [mode, setMode] = useState("focus");

    const tick = () => {
        if (currMins === 0 && currSecs === 0) {
            // reset();
            transitionMode();
        } else if (currSecs === 0) {
            setTime([currMins - 1, 59]);
        } else {
            setTime([currMins, currSecs - 1]);
        }
        console.log(currMins, currSecs);
    };

    const reset = () => setTime([parseInt(startingMins), parseInt(startingSecs)]);

    function transitionMode() {
        setActive(false);
        if (mode === "focus") {
            console.log("end of focus")
            setMode("break");
            setTime([parseInt(breakMins), parseInt(breakSecs)]);
        } else {
            setMode("focus");
            reset();
        }
    }
    useEffect(() => {
        if (isActive) {
            const timerId = setInterval(() => tick(), 1000);
            return () => clearInterval(timerId);
        }
    });


    return (
        <>
            <span>{`${currMins.toString().padStart(2, '0')}:${currSecs
                .toString().padStart(2, '0')}`}</span> 
            <div className="buttons">
                <button onClick={() => setActive(!isActive)}>{isActive ? "pause" : "play"}</button>
                <button onClick={reset}>reset</button>
            </div>
        </>
    );
}

export default Timer;