import { todoGenerator, todoDeleter, todoUpdater, todosAssigner } from '../utils';

const ASSIGN_TODOS = 'ASSIGN_TODOS';
const UPDATE_TODO = 'UPDATE_TODO';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';


const defaultState = [];

export function todosReducer(state = defaultState, action) {
  const data = action.payload;

  switch (action.type) {
    case ASSIGN_TODOS:
      return [...state, ...todosAssigner(data)];

    case ADD_TODO:
      return [...state, todoGenerator(data.id, data.title, data.description, data.createdBy)];

    case DELETE_TODO:
      return todoDeleter(state, action.payload);

    case UPDATE_TODO:
      return todoUpdater(state, data.id, data.title, data.description);

    default:
      return state;
  }
}

export const assignTodos = payload => ({ type: ASSIGN_TODOS, payload });

export const addTodo = payload => ({ type: ADD_TODO, payload });

export const deleteTodo = payload => ({ type: DELETE_TODO, payload });

export const updateTodo = payload => ({ type: UPDATE_TODO, payload });