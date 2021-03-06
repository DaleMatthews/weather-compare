import { SET_DATASET_SELECTION } from "../actionTypes";

const selectedDataset = (state = "Normal Average", action) => {
  switch (action.type) {
    case SET_DATASET_SELECTION:
      return action.payload.dataset;
    default:
      return state;
  }
};

export default selectedDataset;
