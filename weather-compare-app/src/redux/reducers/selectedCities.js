import {
  SET_CITY_SELECTION,
  ADD_CITY_SELECTION,
  REMOVE_CITY_SELECTION
} from "../actionTypes";

const initialState = {
  currentCities: ["BIRMINGHAM, AL"]
};

const selectedCities = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY_SELECTION: {
      return {
        ...state
      };
    }
    case REMOVE_CITY_SELECTION: {
      console.log("[3] Reducer Working:", action.payload);
      const newArr = state.currentCities;
      newArr.splice(action.payload, 1);
      return {
        ...state,
        currentCities: newArr
      };
    }
    case ADD_CITY_SELECTION: {
      console.log("ADD CITY WORKING");
      return {
        ...state,
        currentCities: [...state.currentCities, ...action.payload.cities]
      };
    }
    default: {
      return state;
    }
  }
};

export default selectedCities;
