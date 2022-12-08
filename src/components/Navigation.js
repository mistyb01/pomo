import React, { useState, useEffect } from 'react'

function Navigation({ settingsOpen, setSettingsOpen }) {
    return (
        <nav>
            <ul>
                <li>history</li>
                <li onClick={() => setSettingsOpen(!settingsOpen)}>settings</li>
            </ul>
        </nav>
    );
}

export default Navigation;