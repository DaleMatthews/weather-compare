import React, { Component } from "react";
import "./App.css";
import DisplayCities from "./components/DisplayCities/DisplayCities";
import DataSelection from "./components/DataSelection/DataSelection";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WeatherChart from "./components/WeatherChart/WeatherChart";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <DisplayCities />
        <WeatherChart />
        <DataSelection />
        <Footer />
      </div>
    );
  }
}

export default App;
