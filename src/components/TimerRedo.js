import React, { useState, useEffect } from 'react'
import useSound from 'use-sound';
import doneSfx from '../sound/eb_fanfare.wav';
import breakEndSfx from '../sound/sfx-selectjingle.wav';

function TimerRedo({ workMins, breakMins }) {

    const [ playWorkSound, {stopWorkSound} ] = useSound(
        doneSfx,
        {volume: 1}
    );

    const [ playBreakSound, {stopBreakSound} ] = useSound(
        breakEndSfx,
        {volume: 1}
    );

    const [isActive, setActive] = useState(false);
    const [workMode, setWorkMode] = useState(true);

    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    const [[currMins, currSecs], setTime] = useState([workMins, 0]);

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

    const reset = () => setTime([parseInt(workMins), parseInt(0)]);

    React.useEffect(() => {
        if (isActive) {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
        }
    })

    return (
        <>
            <h3>{workMode ? "let's focus..." : "take it easy!"}</h3>
            <span>{`${currMins.toString().padStart(2, '0')}:${currSecs
                .toString().padStart(2, '0')}`}</span> 
            <div className="buttons">
                <button onClick={() => setActive(!isActive)}>{isActive ? "pause" : "play"}</button>
                {/* <button onClick={reset}>reset</button>
                <button onClick={transitionMode}>skip</button> */}
            </div>
        </>
    );
}

export default TimerRedo;