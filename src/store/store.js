// src/store/store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer'; // Update this line

const rootReducer = combineReducers({
    auth: authReducer, // Authentication state
});

export const store = createStore(rootReducer);
