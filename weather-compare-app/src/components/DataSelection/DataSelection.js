import React from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { setDatasetSelection } from "../../redux/actions";
import { getSelectedDatasetWithDescription } from "../../redux/selectors";
import "./DataSelection.css";

const DataSelection = ({
  selectedDatasetWithDescription,
  setDatasetSelection,
}) => {
  const cities = Object.keys(WeatherData);

  const createClassName = (dataset) =>
    dataset === selectedDatasetWithDescription.name
      ? "dataset dataset--selected"
      : "dataset";

  const datasets = Object.keys(WeatherData[cities[0]]).map((dataset) => (
    <button
      key={dataset}
      className={createClassName(dataset)}
      onClick={() => setDatasetSelection(dataset)}
    >
      {dataset}
    </button>
  ));

  return (
    <div className="data-selection-wrapper">
      <div className="data-selection">
        <p className="data-selection-header">Select Weather Data</p>
        {datasets}
      </div>
      {/* <div className="data-description">
        <span>{selectedDatasetWithDescription.description}.</span>
        <span>Read more about the data <a href="https://www.ncdc.noaa.gov/ghcn/comparative-climatic-data">here</a>.</span>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedDataset } = state;
  const selectedDatasetWithDescription = getSelectedDatasetWithDescription(
    state,
    selectedDataset
  );
  return { selectedDatasetWithDescription };
};

export default connect(mapStateToProps, { setDatasetSelection })(DataSelection);
