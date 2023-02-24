import { ADD_TODO, DELETE_TODO, UPDATE_TODO, ASSIGN_TODOS } from './actionTypes';
import { todoGenerator, todoDeleter, todoUpdater, todosAssigner } from '../utils';

const defaultState = [];

export function todosReducer(state = defaultState, action) {
  const data = action.payload;

  switch (action.type) {
    case ASSIGN_TODOS:
      return [...state, ...todosAssigner(data)];

    case ADD_TODO:
      return [...state, todoGenerator(data.id, data.title, data.description)];

    case DELETE_TODO:
      return todoDeleter(state, action.payload);

    case UPDATE_TODO:
      return todoUpdater(state, data.id, data.title, data.description);

    default:
      return state;
  }
}

