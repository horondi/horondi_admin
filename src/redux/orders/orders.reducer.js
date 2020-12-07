import {SET_ORDER, SET_ORDER_LOADING, SET_ORDER_ERROR, SET_ORDER_LIST} from './orders.types'

export const initialState = {
  list: [],
  selectedOrder: null,
  orderLoading: false,
  orderError: null
};

const ordersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        selectedOrder: action.payload
      };
    case SET_ORDER_LOADING:
      return {
        ...state,
        orderLoading: action.payload
      };
    case SET_ORDER_ERROR:
      return {
        ...state,
        orderError: action.payload
      };
    case SET_ORDER_LIST:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state
  }
}

export default ordersReducer
