import axios from 'axios';

const FETCH_REPAIRS = 'FETCH_REPAIRS';
const FETCH_REPAIRS_ERROR = 'FETCH_REPAIRS_ERROR';
const SET_REPAIRS = 'SET_REPAIRS';

export const getRepairs = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_REPAIRS
  });

  try {
    const { data } = await axios.get('api/v0/repairs/');

    dispatch({
      type: SET_REPAIRS,
      repairs: data,
    });
  } catch(error) {
    dispatch({
      type: FETCH_REPAIRS_ERROR
    });
  }
}

const repairsState = {
  repairs: [],
  fetching: false,
}

export function repairsReducer(state = repairsState, action) {
  switch (action.type) {
    case FETCH_REPAIRS:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_REPAIRS_ERROR:
      return {
        ...state,
        fetching: false,
      };
    case SET_REPAIRS:
      return {
        fetching: false,
        repairs: action.repairs,
      };
    default:
      return state;
  }
}
