import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE  } from "./actionTypes";

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user, // User data from API
});

export const logout = () => ({
    type: LOGOUT,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error, // Error message from API
});

export const updateProfile = (updatedUser) => {
  return {
    type: UPDATE_PROFILE,
    payload: updatedUser,
  };
};