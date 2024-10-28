// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Retrieve user data from localStorage, if available
const storedUser = localStorage.getItem('user');
const initialState = {
    isAuthenticated: !!storedUser, // Initialize based on whether storedUser is present
    user: storedUser ? JSON.parse(storedUser) : null, // Parse the stored user data, if any
    error: null,
};

// Reducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            // Save user data to localStorage on successful login
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null, // Clear any errors
            };
        
        case LOGOUT:
            // Remove user data from localStorage on logout
            localStorage.removeItem('user');
            return {
                ...state,
                isAuthenticated: false,
                user: null, // Clear the user data
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload, // Capture the error message from the action
            };
        
        default:
            return state;
    }
};

// Action creators

export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData, // Pass user data to the reducer
});

export const logout = () => ({
    type: LOGOUT,
});

export const loginFailure = (errorMessage) => ({
    type: LOGIN_FAILURE,
    payload: errorMessage, // Pass error message to the reducer
});

export default authReducer;
