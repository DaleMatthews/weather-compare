import React, { Component } from "react";
import "./App.css";
import CitySelection from "./components/CitySelection/CitySelection";
import DisplayCities from "./components/DisplayCities/DisplayCities";
import DataSelection from "./components/DataSelection/DataSelection";
import Footer from "./components/Footer/Footer";
import WeatherChart from "./components/WeatherChart/WeatherChart";

class App extends Component {
  render() {
    return (
      <div id="app">
        <CitySelection />
        <DisplayCities />
        <WeatherChart />
        <DataSelection />
        <Footer />
      </div>
    );
  }
}

export default App;
