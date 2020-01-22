import { SET_CITY_SELECTION } from "../actionTypes";

const initialState = ["BIRMINGHAM, AL", null];

const selectedCities = (state = initialState, action) => {
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
