const UPDATE_ROLE = 'UPDATE_ROLE';
const UPDATE_ID = 'UPDATE_ID';

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

export const updateRoleAction = payload => ({ type: UPDATE_ROLE, payload });

export const updateIdAction = payload => ({ type: UPDATE_ID, payload });