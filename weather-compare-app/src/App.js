import React from 'react';
import logo from './logo.svg';
import './App.css';
import CityComparison from './components/CityComparison';
import DataSelection from './components/DataSelection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DataSelection/>
      </header>
      <CityComparison/>
    </div>
  );
}

export default App;
