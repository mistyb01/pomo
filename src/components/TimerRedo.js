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

    const [currMins, setCurrMins] = useState(25);
    const [currSecs, setCurrSecs] = useState(0);
    const [isActive, setActive] = useState(false);
    const [workMode, setWorkMode] = useState(true);


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