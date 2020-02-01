import React, { Component } from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { addCitySelection, setCitySelection } from "../../redux/actions";
import { getSelectedCityData } from "../../redux/selectors";

class CitySelection extends Component {
  handleSelect(e) {
    this.props.addCitySelection(
      [...e.target.options].filter(o => o.selected).map(o => o.value)
    );
  }

  render() {
    const cities = Object.keys(WeatherData);
    const cityOptions = cities
      .filter(o => !this.props.currentCities.some(city => city.id === o))
      .map(city => <option key={city}>{city}</option>);
    return (
      <div>
        <select multiple onChange={e => this.handleSelect(e)}>
          {cityOptions}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedCities, selectedDataset } = state;
  const currentCities = getSelectedCityData(
    state,
    selectedCities,
    selectedDataset
  );
  return { currentCities };
};

const mapDispatchToProps = {
  addCitySelection,
  setCitySelection
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelection);
