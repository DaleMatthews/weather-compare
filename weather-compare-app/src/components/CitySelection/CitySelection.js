import React, { Component } from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { setCitySelection } from "../../redux/actions";
import { getSelectedCityData } from "../../redux/selectors";

class CitySelection extends Component {
  componentDidMount() {
    this.props.setCitySelection(
      this.props.cities.filter(o => o).map(o => o.id)
    );
  }

  handleSelect(e) {
    this.props.setCitySelection(
      [...e.target.options].filter(o => o.selected).map(o => o.value)
    );
  }

  render() {
    const cities = Object.keys(WeatherData);
    const cityOptions = cities.map(city => <option key={city}>{city}</option>);
    return (
      <div>
        <select
          multiple
          value={this.props.cities.filter(o => o).map(o => o.id)}
          onChange={e => this.handleSelect(e)}
        >
          {cityOptions}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedCities, selectedDataset } = state;
  const cities = getSelectedCityData(state, selectedCities, selectedDataset);
  return { cities };
};

const mapDispatchToProps = {
  setCitySelection
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelection);
