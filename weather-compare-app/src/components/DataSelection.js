import React from "react";
import { connect } from "react-redux";
import WeatherData from '../data/weather-data.json';
import { setCitySelection, setDatasetSelection } from '../redux/actions';

const DataSelection = ({ setCitySelection, setDatasetSelection }) => {
  const cities = Object.keys(WeatherData)
  const cityOptions = cities.map(city => <option>{city}</option>);
  const datasets = Object.keys(WeatherData[cities[0]]).map(dataset => <option>{dataset}</option>);

  return (
    <div>
      <select multiple onChange={e => setCitySelection([...e.target.options].filter(o => o.selected).map(o => o.value))}>
      {cityOptions}
      </select>
      <select onChange={e => setDatasetSelection(e.target.value)}>
        {datasets}
      </select>
    </div>
  );
};

const mapStateToProps = state => {
  return { selectedCities: state.selectedCities };
};

export default connect(
  mapStateToProps,
  { setCitySelection, setDatasetSelection }
)(DataSelection);
