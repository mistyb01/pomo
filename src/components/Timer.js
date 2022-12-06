import React, { useState, useEffect } from 'react'

function Timer({focusMinSecs, breakMinSecs}) {
    // timer logic adapted from bhargav bachina's code: https://medium.com/bb-tutorials-and-thoughts/how-to-create-a-countdown-timer-in-react-app-e99916046292

    // setting initial values of minutes and seconds to be what was passed into minSecs prop
    const {startingMins = 0, startingSecs = 0} = focusMinSecs;
    const {breakMins = 0, breakSecs = 0} = breakMinSecs;

    const [[currMins, currSecs], setTime] = useState([startingMins, startingSecs]);
    const [isActive, setActive] = useState(false);
    const [mode, setMode] = useState("focus");

    const [workLength, setWorkLength] = useState(25);
    const [timeLastStart, setTimeLastStart] = useState(new Date().getTime());

    function findCurrTime() {
        let now = new Date();
        let workSeconds = workLength * 60;
        let currentTime = now.getTime();
        
        let timeDifference = (currentTime - timeLastStart) / 1000;
        let displayMillisec = (workSeconds - timeDifference);

        let displayMin = Math.trunc(displayMillisec / 60);
        let displaySec = Math.trunc(displayMillisec % 60);
        console.log(displayMin, displaySec);
    }

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

    const reset = () => {
        mode === "focus" ?
        setTime([startingMins, startingSecs]) :
        setTime([breakMins, breakSecs]);
    };

    function transitionMode() {
        setActive(false);
        if (mode === "focus") {
            console.log("end of focus")
            setMode("break");
            setTime([breakMins, breakSecs]);
        } else {
            setMode("focus");
            setTime([startingMins, startingSecs]);
        }
    }

    useEffect(() => {
        if (isActive) {
            const timerId = setInterval(() => findCurrTime(), 1000);
            return () => clearInterval(timerId);
        }
    });

    // // run once at start
    // useEffect(() => {
    //     findCurrTime();
    // }, [])


    return (
        <>
            <h3>{mode === "focus" ? "let's focus..." : "take it easy!"}</h3>
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