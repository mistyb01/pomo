import React, { useState, useEffect } from 'react'

function Timer() {

    const [workLength, setWorkLength] = useState(1);
    const [breakLength, setBreakLength] = useState(0.1);
    const [timeLastStart, setTimeLastStart] = useState(new Date().getTime());

    const [[currMins, currSecs], setTime] = useState([workLength, 0]);
    const [timeLeft, setTimeLeft] = useState(workLength * 60);
    const [previousTime, setPreviousTime] = useState(timeLeft);

    const [isActive, setActive] = useState(false);
    const [workMode, setWorkMode] = useState(true);


    function findCurrTime() {
        let currentTime = new Date().getTime();
        
        let timeDifference = (currentTime - timeLastStart) / 1000;
        let displayTime = (timeLeft - timeDifference);
        setPreviousTime(displayTime);

        let displayMin = Math.trunc(displayTime / 60);
        let displaySec = Math.round(displayTime % 60);
        console.log(displayMin, displaySec);
        
        setTime([displayMin, displaySec]);

        if (displayMin === 0 && displaySec === 0) transitionMode();
    }

    const reset = () => {
        setTimeLastStart(new Date().getTime());
        workMode ? resetWork() : resetBreak();     
    };

    function resetBreak() {
        setTime([breakLength, 0]);
        setTimeLeft(breakLength * 60);
        setPreviousTime(breakLength * 60);
    }

    function resetWork() {
        setTime([workLength, 0]);
        setTimeLeft(workLength * 60);
        setPreviousTime(workLength * 60);
    }

    function transitionMode() {
        setActive(false);
        workMode ? resetBreak() : resetWork(); 
        setWorkMode(!workMode);   
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
            <h3>{workMode ? "let's focus..." : "take it easy!"}</h3>
            <span>{`${currMins.toString().padStart(2, '0')}:${currSecs
                .toString().padStart(2, '0')}`}</span> 
            <div className="buttons">
                <button onClick={() => setActive(!isActive)}>{isActive ? "pause" : "play"}</button>
                <button onClick={reset}>reset</button>
                <button onClick={transitionMode}>skip</button>
            </div>
        </>
    );
}

export default Timer;