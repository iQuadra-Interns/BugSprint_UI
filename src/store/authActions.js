// src/store/authActions.js

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});
