import {
  SET_CITY_SELECTION,
  ADD_CITY_SELECTION,
  REMOVE_CITY_SELECTION,
  SET_DATASET_SELECTION
} from "./actionTypes";

export const setCitySelection = cities => ({
  type: SET_CITY_SELECTION,
  payload: { cities }
});
export const addCitySelection = city => ({
  type: ADD_CITY_SELECTION,
  payload: { city }
});
export const removeCitySelection = city => ({
  type: REMOVE_CITY_SELECTION,
  payload: { city }
});
export const setDatasetSelection = dataset => ({
  type: SET_DATASET_SELECTION,
  payload: { dataset }
});
