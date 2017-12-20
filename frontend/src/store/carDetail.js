import axios from 'axios';

const FETCH_CAR = 'FETCH_CAR';
const FETCH_CAR_ERROR = 'FETCH_CAR_ERROR';
const SET_CAR = 'SET_CAR';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const FETCH_UPDATE_CAR = 'FETCH_UPDATE_CAR';
const FETCH_UPDATE_CAR_ERROR = 'FETCH_UPDATE_CAR_ERROR';

export const getCar = (carId) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_CAR
  });

  try {
    const { data } = await axios.get(`api/v0/cars/${carId}/`);

    dispatch({
      type: SET_CAR,
      car: data,
    });
  } catch(error) {
    dispatch({
      type: FETCH_CAR_ERROR
    });
  }
}

export const toggleModal = (modalIsOpen) => {
  return {
    type: TOGGLE_MODAL,
    modalIsOpen,
  }
}

export const updateCar = (car) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_UPDATE_CAR
  });

  try {
    await axios.post(`/api/v0/cars/${car.id}/edit/`, {...car, id: undefined});

    dispatch({
      type: SET_CAR,
      car,
    });
  } catch(error) {
    dispatch({
      type: FETCH_UPDATE_CAR_ERROR
    });
  }
}

const carState = {
  car: {},
  fetching: false,
  fetchingUpdate: false,
  modalIsOpen: false,
}

export function carReducer(state = carState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalIsOpen: action.modalIsOpen,
      };
    case FETCH_UPDATE_CAR:
      return {
        ...state,
        fetchingUpdate: true,
      };
    case FETCH_UPDATE_CAR_ERROR:
      return {
        ...state,
        fetchingUpdate: false,
      };
    case FETCH_CAR:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_CAR_ERROR:
      return {
        ...state,
        fetching: false,
      };
    case SET_CAR:
      return {
        ...state,
        fetching: false,
        car: action.car,
      };
    default:
      return state;
  }
}
