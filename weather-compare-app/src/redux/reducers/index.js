import { combineReducers } from 'redux';
import selectedCities from './selectedCities';
import selectedDataset from './selectedDataset';

export default combineReducers({ selectedCities, selectedDataset });
