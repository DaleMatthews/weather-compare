import {
  SET_CITY_SELECTION,
  ADD_CITY_SELECTION,
  REMOVE_CITY_SELECTION
} from "../actionTypes";

const initialState = ["Birmingham, AL", "Jacksonville, FL", "Boston, MA", "Kansas City, MO"];

const selectedCities = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY_SELECTION: {
      return action.payload.cities;
    }
    case REMOVE_CITY_SELECTION: {
      return state.filter((city, index) => index !== action.payload.index);
    }
    case ADD_CITY_SELECTION: {
      return state.concat([action.payload.city]);
    }
    default: {
      return state;
    }
  }
};

export default selectedCities;
