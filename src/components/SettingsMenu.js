import React, { useState, useEffect } from 'react'

function SettingsMenu() {
    const [workInput, setWorkInput] = useState(25);
    const [breakInput, setBreakInput] = useState(5);

    function handleSubmit(e) {
       e.preventDefault();
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
                    <input id="work-time-input" type="number" onChange={handleChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="break-time-input">
                        Break min
                    </label>
                    <input id="break-time-input" type="number" onChange={handleChange} />
                </div>
                <button type="submit" className="form-button">save</button>
            </form>
        </div>
    );
}

export default SettingsMenu;