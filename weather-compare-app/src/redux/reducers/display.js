import { DISPLAY_CITY_SELECTION, HIDE_CITY_SELECTION } from "../actionTypes";

const initialState = false;

const displaySettings = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_CITY_SELECTION: {
      console.log("DISPLAY CITY SELECTION SUCCESSFUL");
      return true;
    }
    case HIDE_CITY_SELECTION: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default displaySettings;
