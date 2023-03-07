import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import { todosReducer } from './reducers/todosReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ userReducer, todosReducer });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;