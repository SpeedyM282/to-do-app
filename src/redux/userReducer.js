import { UPDATE_ROLE, UPDATE_ID, UPDATE_MODE } from './actionTypes';

const defaultState = {
  role: null,
  mode: false,
  id: null
}

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_ROLE:
      return { ...state, role: action.payload };

    case UPDATE_ID:
      return { ...state, id: action.payload };

    case UPDATE_MODE:
      return { ...state, mode: action.payload };

    default:
      return state;
  }
}

