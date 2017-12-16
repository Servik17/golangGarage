import axios from 'axios';

const FETCH_REPAIR = 'FETCH_REPAIR';
const FETCH_REPAIR_ERROR = 'FETCH_REPAIR_ERROR';
const SET_REPAIR = 'SET_REPAIR';

export const getRepair = (repairId) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_REPAIR
  });

  try {
    const { data } = await axios.get(`api/v0/repair/${repairId}`);

    dispatch({
      type: SET_REPAIR,
      repair: data,
    });
  } catch(error) {
    dispatch({
      type: FETCH_REPAIR_ERROR
    });
  }
}

const repairState = {
  repair: {
    repairSpareParts: [],
  },
  fetching: false,
}

export function repairReducer(state = repairState, action) {
  switch (action.type) {
    case FETCH_REPAIR:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_REPAIR_ERROR:
      return {
        ...state,
        fetching: false,
      };
    case SET_REPAIR:
      return {
        fetching: false,
        repair: action.repair,
      };
    default:
      return state;
  }
}
