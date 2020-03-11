import React, { Component } from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { addCitySelection, setCitySelection } from "../../redux/actions";
import { getSelectedCityData } from "../../redux/selectors";
import "./CitySelection.css";

const cities = Object.keys(WeatherData).sort((cityA, cityB) => {
  // split to [city, state]
  const a = cityA.split(',');
  const b = cityB.split(',');
  // if the state is the same, then compare city name, else compare state name
  return a[1] === b[1] ? a[0] > b[0] : a[1] > b[1];
});

class CitySelection extends Component {
  constructor(props) {
    super(props);
    this.state = { filteredCities: cities };
  }

  componentDidMount() {
    this.filterInput.focus();
  }

  handleSelect(e) {
    this.props.addCitySelection(e.target.innerText);
    this.props.hideDialog();
  }

  onClickOverlay(e) {
    if (e.target.className === 'city-selection-overlay') this.props.hideDialog();
  }

  filter(e) {
    this.setState({
      filteredCities: cities.filter(c => c.toLowerCase().includes(e.target.value.toLowerCase())),
    });
  }

  render() {
    const cityOptions = this.state.filteredCities
      .filter(o => !this.props.currentCities.some(city => city.id === o))
      .map(city => <li key={city} onClick={e => this.handleSelect(e)}>{city}</li>);
    return (
      <div className="city-selection-overlay" onClick={e => this.onClickOverlay(e)}>
        <div className="city-selection-dialog">
          <input ref={(input) => { this.filterInput = input; }} placeholder="Filter" onChange={e => this.filter(e)}/>
          <ul>
            {cityOptions}
          </ul>
        </div>
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
