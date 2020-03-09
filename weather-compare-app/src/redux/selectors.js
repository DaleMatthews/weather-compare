import DatasetDescriptions from "../data/datasetDescriptions";
import WeatherData from "../data/weather-data.json";

export const getSelectedCityData = (store, selectedCities, selectedDataset) => {
  return selectedCities.map(c => {
    if (!WeatherData[c][selectedDataset]) WeatherData[c][selectedDataset] = Array(12).fill("*");
    return {
      id: c,
      values: WeatherData[c][selectedDataset].slice(0, 12).map((d, idx) => {
        return {
          date: idx,
          temperature: d
        };
      })
    };
  });
};

export const getSelectedDatasetWithDescription = (store, selectedDataset) => ({
  name: selectedDataset,
  description: DatasetDescriptions[selectedDataset],
});
