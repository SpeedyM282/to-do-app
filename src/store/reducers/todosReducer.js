import { todoUpdater } from '../../utils';

const ASSIGN_TODOS = 'ASSIGN_TODOS';
const UPDATE_TODO = 'UPDATE_TODO';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';


const defaultState = [];

export function todosReducer(state = defaultState, action) {
  const data = action.payload;

  switch (action.type) {
    case ASSIGN_TODOS:
      return [...state, ...action.payload];

    case ADD_TODO:
      return [...state, ...action.payload];

    case DELETE_TODO:
      return state.filter(e => e.id !== action.payload);

    case UPDATE_TODO:
      return todoUpdater(state, data.id, data.title, data.description);

    default:
      return state;
  }
}

export const assignTodosAction = payload => ({ type: ASSIGN_TODOS, payload });

export const addTodoAction = payload => ({ type: ADD_TODO, payload });

export const deleteTodoAction = payload => ({ type: DELETE_TODO, payload });

export const updateTodoAction = payload => ({ type: UPDATE_TODO, payload });