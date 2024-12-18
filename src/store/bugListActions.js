import axios from 'axios';

// action type definitions
export const FETCH_BUGS_REQUEST = 'FETCH_BUGS_REQUEST';
export const FETCH_BUGS_SUCCESS = 'FETCH_BUGS_SUCCESS';
export const FETCH_BUGS_FAILURE = 'FETCH_BUGS_FAILURE';

// create actions
export const fetchBugsRequest = () => ({ type: FETCH_BUGS_REQUEST });
export const fetchBugsSuccess = (bugs) => ({ type: FETCH_BUGS_SUCCESS, payload: bugs });
export const fetchBugsFailure = (error) => ({ type: FETCH_BUGS_FAILURE, payload: error });

// fetch bugs
export const fetchBugs = () => async (dispatch) => {
    dispatch(fetchBugsRequest());
    try {
        const response = await axios.post('https://v3dfk4mm6zkwbehcs5c6cvauae0yzksa.lambda-url.us-east-1.on.aws/bugs_list');
        dispatch(fetchBugsSuccess(response.data.bugs));  // Adjusted for the new response structure
    } catch (error) {
        dispatch(fetchBugsFailure(error.message));
    }
};
