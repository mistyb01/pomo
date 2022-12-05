import React from 'react';
import Timer from './components/Timer.js';

function App() {

  const minSecs = {startingMins: 0, startingSecs: 10}
  const breakMinSecs = {breakMins: 0, breakSecs: 5}

  return (
    <div className="main-wrapper">
      <Timer minSecs={minSecs} breakMinSecs={breakMinSecs}/>
    </div>
  );
}

export default App;
