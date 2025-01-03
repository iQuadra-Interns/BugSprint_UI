// store.js

import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer'; 

const rootReducer = combineReducers({
    auth: authReducer,  // Auth reducer to handle user authentication and data
});

export const store = createStore(rootReducer);
