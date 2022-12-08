import React, { useState, useEffect } from 'react'

function SettingsMenu() {

    function handleSubmit(e) {
       console.log(e); 
    }

    return (
        <div className='settings flex-column-center'>
            <h3>settings</h3>
            <form onSubmit={handleSubmit} className='flex-column-center'>
                <div className="form-field">
                    <label htmlFor="work-time-input">
                        Work min
                    </label>
                    <input id="work-time-input" type="number" />
                </div>
                <div className="form-field">
                    <label htmlFor="break-time-input">
                        Break min
                    </label>
                    <input id="break-time-input" type="number" />
                </div>
                <button type="submit" className="form-button">save</button>
            </form>
        </div>
    );
}

export default SettingsMenu;