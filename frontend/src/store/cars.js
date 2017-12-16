import axios from 'axios';

const FETCH_CARS = 'FETCH_CARS';
const FETCH_CARS_ERROR = 'FETCH_CARS_ERROR';
const SET_CARS = 'SET_CARS';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const FETCH_CREATE_CAR = 'FETCH_CREATE_CAR';
const FETCH_CREATE_CAR_ERROR = 'FETCH_CREATE_CAR_ERROR';

export const getCars = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_CARS
  });

  try {
    const { data } = await axios.get('api/v0/cars');

    dispatch({
      type: SET_CARS,
      cars: data,
    });
  } catch(error) {
    dispatch({
      type: FETCH_CARS_ERROR
    });
  }
}

export const createCar = (car) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_CREATE_CAR
  });

  try {
    const { id } = await axios.post('/api/v0/cars/create', car);
    const { cars } = getState().cars;

    dispatch({
      type: SET_CARS,
      cars: [{...car, id}, ...cars],
    });
  } catch(error) {
    dispatch({
      type: FETCH_CREATE_CAR_ERROR
    });
  }
}

export const toggleModal = (modalIsOpen) => {
  return {
    type: TOGGLE_MODAL,
    modalIsOpen,
  }
}

const carsState = {
  cars: [],
  fetching: false,
  fetchingCreate: false,
  modalIsOpen: false,
}

export function carsReducer(state = carsState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalIsOpen: action.modalIsOpen,
      };
    case FETCH_CARS:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_CREATE_CAR:
      return {
        ...state,
        fetchingCreate: true,
      };
    case FETCH_CARS_ERROR:
      return {
        ...state,
        fetching: false,
      };
    case FETCH_CREATE_CAR_ERROR:
      return {
        ...state,
        fetchingCreate: false,
      };
    case SET_CARS:
      return {
        fetching: false,
        fetchingCreate: false,
        cars: action.cars,
        modalIsOpen: false,
      };
    default:
      return state;
  }
}
