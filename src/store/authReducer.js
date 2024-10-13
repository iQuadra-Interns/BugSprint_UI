// src/store/authReducer.js

// Initial state for authentication
const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

// Define action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

// The authReducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload, // assuming action.payload contains user data
                error: null,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload, // assuming action.payload contains the error message
            };
        default:
            return state;
    }
};

export default authReducer;
