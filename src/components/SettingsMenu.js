import React, { useState, useEffect } from 'react'

function SettingsMenu({ workMins, breakMins, updateSessionLengths }) {
    const [workInput, setWorkInput] = useState(workMins);
    const [breakInput, setBreakInput] = useState(breakMins);

    function handleSubmit(e) {
       e.preventDefault();
       updateSessionLengths(workInput, breakInput);
    }

    function handleChange(e) {
        let mins = parseInt(e.target.value);
        e.target.id == 'work-time-input' ? setWorkInput(mins) 
        : setBreakInput(mins);
    }

    return (
        <div className='settings flex-column-center'>
            <h3>settings</h3>
            <form onSubmit={handleSubmit} className='flex-column-center'>
                <div className="form-field">
                    <label htmlFor="work-time-input">
                        Work min
                    </label>
                    <input id="work-time-input" type="number" onChange={handleChange} value={workInput}/>
                </div>
                <div className="form-field">
                    <label htmlFor="break-time-input">
                        Break min
                    </label>
                    <input id="break-time-input" type="number" onChange={handleChange} value={breakInput} />
                </div>
                <button type="submit" className="form-button">save</button>
            </form>
        </div>
    );
}

export default SettingsMenu;