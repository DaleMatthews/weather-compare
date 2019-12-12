import { SET_CITY_SELECTION } from '../actionTypes';

const selectedCities = (state = [], action) => {
  switch (action.type) {
    case SET_CITY_SELECTION: {
      return action.payload.cities;
    }
    default: {
      return state;
    }
  }
};

export default selectedCities;
