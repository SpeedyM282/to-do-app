import { UPDATE_ROLE } from './actionTypes';

const defaultState = {
  role: null
}

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_ROLE:
      return { ...state, role: action.payload };

    default:
      return state;
  }
}

