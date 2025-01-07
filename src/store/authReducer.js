import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE } from "./actionTypes";

// Retrieve user data from sessionStorage
const storedUser = sessionStorage.getItem('user');
const initialState = {
    isAuthenticated: !!storedUser, // Initialize based on sessionStorage
    user: storedUser ? JSON.parse(storedUser) : null, // Parse user data if available
    error: null, // Error messages
};

const authReducer = (state = initialState, action) => {


    switch (action.type) {
        case LOGIN_SUCCESS:
            // Save user data to sessionStorage on successful login
            sessionStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null, // Clear any previous errors
            };

        case LOGOUT:
            // Remove user data from sessionStorage on logout
            sessionStorage.removeItem('user');
            return {
                ...state,
                isAuthenticated: false,
                user: null, // Clear user data
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload, // Store error message
            };

        case UPDATE_PROFILE: // Handling profile updates
            // Update the user information in the store
            const updatedUser = { ...state.user, developer_details: { ...state.user.developer_details, ...action.payload } };
            
            // Store the updated user information in localStorage
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return {
              ...state,
              user: updatedUser, // Set the updated user in the Redux store
            };
      
        default:
            return state;
        }

        
};

export default authReducer;
