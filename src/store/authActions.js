// src/store/actions/authActions.js

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Action Creators
export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
});
