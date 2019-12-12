import WeatherData from '../data/weather-data.json';

export const getSelectedCityData = (store, selectedCities, selectedDataset) => {
  return selectedCities.map(c => ({ name: c, data: WeatherData[c][selectedDataset] }));
};
