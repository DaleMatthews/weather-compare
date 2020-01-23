import React from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { setDatasetSelection } from "../../redux/actions";
import "./DataSelection.css";

const createClassName = dataset => `dataset dataset--${dataset.toLowerCase().replace(/\s/gi, '-')}`;

const DataSelection = ({ setDatasetSelection }) => {
  const cities = Object.keys(WeatherData);

  const datasets = Object.keys(WeatherData[cities[0]]).map(
    dataset => <span key={dataset} className={createClassName(dataset)}>{dataset}</span>
  );
  return (
    <div className="data-selection-wrapper">
      <div className="data-selection">
        {datasets}
      </div>
    </div>
  );
};

export default connect(null, { setDatasetSelection })(DataSelection);
