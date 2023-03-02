import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userReducer';
import { todosReducer } from './todosReducer';

const rootReducer = combineReducers({ userReducer, todosReducer });

const store = createStore(rootReducer, composeWithDevTools());

export default store;