import React from 'react';
import Destination from './components/Destination';
import Origin from './components/Origin';
import Protocol from './components/Protocol';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Challenge</h1>
      </header>
      <main>
        <Destination />
        <Origin />
        <Protocol />
      </main>
    </div>
  );
};

export default App;
