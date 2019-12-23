import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCityData } from '../redux/selectors';

const CityComparison = ({ cities, selectedDataset }) => (
  <ul className='city-comparison'>
    <h2>{selectedDataset}</h2>
    {cities && cities.length
      ? cities.map((city, index) => {
          return <li>{`${city.name}: ${city.data.join(',')}`}</li>;
        })
      : 'Select a city!'}
  </ul>
);

const mapStateToProps = state => {
  const { selectedCities, selectedDataset } = state;
  const cities = getSelectedCityData(state, selectedCities, selectedDataset);
  return { cities, selectedDataset };
};

export default connect(mapStateToProps)(CityComparison);
