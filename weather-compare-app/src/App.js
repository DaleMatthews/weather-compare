import React, { Component } from "react";
import "./App.css";
import CitySelection from "./components/CitySelection/CitySelection";
import DataSelection from "./components/DataSelection/DataSelection";
import WeatherChart from "./components/WeatherChart/WeatherChart";

class App extends Component {
  render() {
    return (
      <div id="app">
        <CitySelection/>
        <WeatherChart/>
        <DataSelection/>
      </div>
    );
  }
}

export default App;
