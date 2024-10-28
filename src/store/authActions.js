export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,  // The user object returned from the sign-in API
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});
