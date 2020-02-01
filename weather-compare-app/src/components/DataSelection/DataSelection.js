import React from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { setDatasetSelection } from "../../redux/actions";
import "./DataSelection.css";


const DataSelection = ({ selectedDataset, setDatasetSelection }) => {
  const cities = Object.keys(WeatherData);

  const createClassName = dataset => (dataset === selectedDataset ? 'dataset dataset--selected' : 'dataset');

  const datasets = Object.keys(WeatherData[cities[0]])
    .map(dataset =>
      <button key={dataset} className={createClassName(dataset)} onClick={() => setDatasetSelection(dataset)}>
        {dataset}
      </button>
    );

  return (
    <div className="data-selection-wrapper">
      <div className="data-selection">
        {datasets}
      </div>
    </div>
  );
};

const mapStateToProps = ({ selectedDataset }) => ({ selectedDataset });

export default connect(mapStateToProps, { setDatasetSelection })(DataSelection);
