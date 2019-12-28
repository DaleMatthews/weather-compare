import React from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { setDatasetSelection } from "../../redux/actions";

const DataSelection = ({ setDatasetSelection }) => {
  const cities = Object.keys(WeatherData)
  const datasets = Object.keys(WeatherData[cities[0]]).map(dataset => <option>{dataset}</option>);

  return (
    <div>
      <select onChange={e => setDatasetSelection(e.target.value)}>
        {datasets}
      </select>
    </div>
  );
};

export default connect(null, { setDatasetSelection })(DataSelection);
