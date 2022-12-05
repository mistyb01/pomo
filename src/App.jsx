import React from 'react';
import Timer from './components/Timer.js';

function App() {

  const minSecs = {startingMins: 25, startingSecs: 0}

  return (
    <div className="main-wrapper">
      <Timer minSecs={minSecs}/>
    </div>
  );
}

export default App;
