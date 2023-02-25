import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from '../userReducer';
// import { adminReducer } from '../adminReducer';
import { todosReducer } from '../todosReducer';

const rootReducer = combineReducers({ userReducer, todosReducer });

const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => console.log(store.getState()));

export default store;