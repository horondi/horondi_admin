import { SET_ERROR } from './error.types';

export const initialState = {
  error: null
};

const errorReducer = (state = initialState, action = {}) => {
  if (action.type === SET_ERROR) {
    return {
      ...state,
      error: action.payload
    };
  }
  return state;
};

export default errorReducer;
