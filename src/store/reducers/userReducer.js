const UPDATE_ROLE = 'UPDATE_ROLE';
const UPDATE_ID = 'UPDATE_ID';
const UPDATE_DISABLED_EDIT = 'UPDATE_DISABLED_EDIT';

const defaultState = {
  id: null,
  role: null,
  isDisabled: false
}

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_ROLE:
      return { ...state, role: action.payload };

    case UPDATE_ID:
      return { ...state, id: action.payload };

    case UPDATE_DISABLED_EDIT:
      return { ...state, isDisabled: action.payload };

    default:
      return state;
  }
}

export const updateRoleAction = payload => ({ type: UPDATE_ROLE, payload });

export const updateIdAction = payload => ({ type: UPDATE_ID, payload });

export const updateIsDisabledAction = payload => ({ type: UPDATE_DISABLED_EDIT, payload });