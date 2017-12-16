import { createStore as _createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';

import { repairsReducer } from './repairs'
import { repairReducer } from './repairDetail';
import { carsReducer } from './cars';
import { carReducer } from './carDetail';

const initialState = {
  cars: {
    cars: [],
    fetching: false,
  },
  carDetail: {
    car: {},
    fetching: false,
    fetchingUpdate: false,
    modalIsOpen: false,
  },
  repairDetail: {
    repair: {
      repairSpareParts: [],
    },
    fetching: false,
  },
  repairs: {
    repairs: [],
    fetching: false,
  },
};

const rootReducer = combineReducers({
  cars: carsReducer,
  carDetail: carReducer,
  repairDetail: repairReducer,
  repairs: repairsReducer,
});


export const createStore = () => {
  const store = _createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  );

  return store;
}
