import React, { useState } from 'react';
import Timer from './components/Timer.js';
import Navigation from './components/Navigation.js';
import SettingsMenu from './components/SettingsMenu.js';

function App() {

  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="main-wrapper">
      {settingsOpen && <SettingsMenu/>}
      <Navigation settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}/>
      <Timer workMins={workMins} breakMins={breakMins}/>
    </div>
  );
}

export default App;
