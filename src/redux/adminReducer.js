import { UPDATE_SHOW_TODOS, UPDATE_SHOW_USERS } from './actionTypes';

const defaultState = {
  showTodos: false,
  showUsers: false
}

export function adminReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_SHOW_TODOS:
      return { ...state, showTodos: action.payload };

    case UPDATE_SHOW_USERS:
      return { ...state, showUsers: action.payload };

    default:
      return state;
  }
}

