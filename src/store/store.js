import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer, // Authentication state
});

export const store = createStore(rootReducer);
