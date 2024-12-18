import { FETCH_BUGS_REQUEST, FETCH_BUGS_SUCCESS, FETCH_BUGS_FAILURE } from './bugListActions';

const initialState = {
    loading: false,
    bugs: [],
    error: '',
};

const bugListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUGS_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_BUGS_SUCCESS:
            return { ...state, loading: false, bugs: action.payload, error: '' };
        case FETCH_BUGS_FAILURE:
            return { ...state, loading: false, bugs: [], error: action.payload };
        default:
            return state;
    }
};

export default bugListReducer;
