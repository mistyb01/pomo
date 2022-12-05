import React from 'react';
import Timer from './components/Timer.js';

function App() {

  const minSecs = {mins: 25, secs: 0}

  return (
    <div className="main-wrapper">
      <Timer minSecs={minSecs}/>
    </div>
  );
}

export default App;
