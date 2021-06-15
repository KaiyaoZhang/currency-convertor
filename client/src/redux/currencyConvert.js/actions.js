import { 
    FETCH_EXCHANGE_RATE_STARTED, 
    FETCH_EXCHANGE_RATE_SUCCESS,
    FETCH_EXCHANGE_RATE_FAILURE 
} from './constants';
import axios from 'axios';

export const getExchangeRate = (date, currency) => {
    return (dispatch) => {
        dispatch(getExchangeRateStarted());

        axios.get(`http://127.0.0.1:8001/api/v1/exchangeRatesWithdate?date=${date}&currencyCode=${currency}`)
        .then((res) => {
            dispatch(getExchangeRateSuccess(res.data.exchangeRate))
        })
        .catch((err) => {
            dispatch(getExchangeRateFailure(err))
        })
    }
}

const getExchangeRateStarted = () => ({
    type: FETCH_EXCHANGE_RATE_STARTED
});

const getExchangeRateSuccess = (rate) => ({
    type: FETCH_EXCHANGE_RATE_SUCCESS,
    payload: rate
});

const getExchangeRateFailure = (error) => ({
    type: FETCH_EXCHANGE_RATE_FAILURE,
    payload: error
})

