import {
    FETCH_EXCHANGE_RATE_STARTED, 
    FETCH_EXCHANGE_RATE_SUCCESS,
    FETCH_EXCHANGE_RATE_FAILURE
} from './constants';

const initState = {
    loading: false,
    rate: ''
}

const rateReducer = (state = initState, action) => {
    switch(action.type) {
        case FETCH_EXCHANGE_RATE_STARTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_EXCHANGE_RATE_SUCCESS:
            return {
                ...state,
                rate: action.payload,
                loading: false
            }
        case FETCH_EXCHANGE_RATE_FAILURE:
            return {
                rate: '',
                loading: false,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default rateReducer;