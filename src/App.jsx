import React from 'react';
import Timer from './components/Timer.js';

function App() {

  const focusMinSecs = {startingMins: 0, startingSecs: 10}
  const breakMinSecs = {breakMins: 0, breakSecs: 5}

  return (
    <div className="main-wrapper">
      <Timer focusMinSecs={focusMinSecs} breakMinSecs={breakMinSecs}/>
    </div>
  );
}

export default App;
