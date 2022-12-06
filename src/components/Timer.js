import React, { useState, useEffect } from 'react'

function Timer({focusMinSecs, breakMinSecs}) {
    // timer logic adapted from bhargav bachina's code: https://medium.com/bb-tutorials-and-thoughts/how-to-create-a-countdown-timer-in-react-app-e99916046292


    const [workLength, setWorkLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [timeLastStart, setTimeLastStart] = useState(new Date().getTime());

    const [[currMins, currSecs], setTime] = useState([workLength, 0]);
    const [timeLeft, setTimeLeft] = useState(workLength * 60);
    const [previousTime, setPreviousTime] = useState(timeLeft);

    const [isActive, setActive] = useState(false);
    const [mode, setMode] = useState("focus");


    function findCurrTime() {
        // let workSeconds = workLength * 60;
        let currentTime = new Date().getTime();
        
        let timeDifference = (currentTime - timeLastStart) / 1000;
        let displayTime = (timeLeft - timeDifference);
        setPreviousTime(displayTime);

        let displayMin = Math.trunc(displayTime / 60);
        let displaySec = Math.trunc(displayTime % 60);
        console.log(displayMin, displaySec);
        
        setTime([displayMin, displaySec]);
    }

    const reset = () => {
        mode === "focus" ?
        setTime([workLength, 0]) :
        setTime([breakLength, 0]);
        setTimeLastStart(new Date().getTime());
        setTimeLeft(workLength * 60);
        setPreviousTime(workLength * 60);
    };

    function transitionMode() {
        setActive(false);
        if (mode === "focus") {
            console.log("end of focus")
            setMode("break");
            setTime([breakLength, 0]);
        } else {
            setMode("focus");
            setTime([workLength, 0]);
        }
    }

    useEffect(() => {
        if (isActive) {
            const timerId = setInterval(() => findCurrTime(), 1000);
            return () => clearInterval(timerId);
        }
    });

    useEffect(() => {
        setTimeLeft(previousTime);
        setTimeLastStart(new Date().getTime());
    }, [isActive])


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