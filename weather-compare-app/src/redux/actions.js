import { SET_CITY_SELECTION, SET_DATASET_SELECTION } from './actionTypes';

export const setCitySelection = cities => ({ type: SET_CITY_SELECTION, payload: { cities } });
export const setDatasetSelection = dataset => ({ type: SET_DATASET_SELECTION, payload: { dataset } });
