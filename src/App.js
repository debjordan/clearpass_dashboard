import React from 'react';
import ClearPassChart from './components/ClearPassChart';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ClearPass Dashboard</h1>
      </header>
      <main>
        <ClearPassChart />
      </main>
    </div>
  );
};

export default App;
