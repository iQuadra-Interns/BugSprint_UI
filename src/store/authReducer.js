const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const UPDATE_PROFILE = "UPDATE_PROFILE"; // New action type for updating profile

// Retrieving the stored user from localStorage
const storedUser = localStorage.getItem("user");

const initialState = {
  isAuthenticated: !!storedUser, // Checks if the user exists in localStorage
  user: storedUser ? JSON.parse(storedUser) : null, // Parses the user data from localStorage
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // When login is successful, store the user in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case LOGOUT:
      // When logging out, remove the user from localStorage
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case LOGIN_FAILURE:
      // On login failure, set the error message
      return {
        ...state,
        error: action.payload,
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
