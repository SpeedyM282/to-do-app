import { UPDATE_ROLE, UPDATE_ID } from './actionTypes';

const defaultState = {
  role: null,
  id: null
}

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_ROLE:
      return { ...state, role: action.payload };

    case UPDATE_ID:
      return { ...state, id: action.payload };

    default:
      return state;
  }
}

