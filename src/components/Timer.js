import React, { useState, useEffect } from 'react'
import useSound from 'use-sound';
import doneSfx from '../sound/eb_fanfare.wav';
import breakEndSfx from '../sound/sfx-selectjingle.wav';

function Timer() {

    const [workLength, setWorkLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [timeLastStart, setTimeLastStart] = useState(new Date().getTime());

    const [[currMins, currSecs], setTime] = useState([workLength, 0]);
    const [timeLeft, setTimeLeft] = useState(workLength * 60);
    const [previousTime, setPreviousTime] = useState(timeLeft);

    const [isActive, setActive] = useState(false);
    const [workMode, setWorkMode] = useState(true);

    const [ playWorkSound, {stopWorkSound} ] = useSound(
        doneSfx,
        {volume: 1}
    );
    const [ playBreakSound, {stopBreakSound} ] = useSound(
        breakEndSfx,
        {volume: 1}
    )

    function findCurrTime() {
        let currentTime = new Date().getTime();
        
        let timeDifference = (currentTime - timeLastStart) / 1000;
        let displayTime = (timeLeft - timeDifference);
        setPreviousTime(displayTime);

        let displayMin = Math.trunc(displayTime / 60);
        let displaySec = Math.round(displayTime % 60);
        console.log(displayMin, displaySec);
        
        setTime([displayMin, displaySec]);

        if (displayMin <= 0 && displaySec <= 0) {
            workMode ? playWorkSound() : playBreakSound();
            transitionMode();
            showNotification();
        }
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

    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("Browser does not support notifications.")
        } else {
            Notification.requestPermission();
        }
    }, [])

    const showNotification = () => {
        // create a new notification
        console.log(Notification.permission);
        if (Notification.permission === 'granted') {
            const notification = new Notification('Pomodoro', {
                body: 'you completed a session!',
                icon: '../img/done-icon.png'
            });

            // close the notification after 10 seconds
            setTimeout(() => {
                notification.close();
            }, 10 * 1000);
        
        }
        
    }

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