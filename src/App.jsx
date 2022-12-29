import React, { useState } from 'react';
import TimerRedo from './components/TimerRedo.js';
import Navigation from './components/Navigation.js';
import SettingsMenu from './components/SettingsMenu.js';

function App() {

  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function updateSessionLengths(workInput, breakInput) {
    setWorkMins(workInput);
    setBreakMins(breakInput);
  }

  return (
    <div className="main-wrapper">
      {settingsOpen && <SettingsMenu workMins={workMins} breakMins={breakMins} updateSessionLengths={updateSessionLengths}/>}
      <Navigation settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}/>
      <TimerRedo workMins={workMins} breakMins={breakMins}/>
    </div>
  );
}

export default App;
