import WeatherData from "../data/weather-data.json";

export const getSelectedCityData = (store, selectedCities, selectedDataset) => {
  return selectedCities.currentCities
    .filter(o => o)
    .map(c => {
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
