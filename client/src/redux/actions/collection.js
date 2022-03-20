import { BIO_COUNT, NON_BIO_COUNT, RECYCLABLE_COUNT } from '../../components/constants/actionTypes'
import * as api from '../api/index'

export const getBiodegradableThisMonth = () => async (dispatch) => {
    try {
        const {data} = await api.getBiodegradableThisMonth();
        dispatch({type: BIO_COUNT, payload: data.result[0].totalWeight});
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getNonBiodegradableThisMonth = () => async (dispatch) => {
    try {
        const {data} = await api.getNonBiodegradableThisMonth();
        dispatch({type: NON_BIO_COUNT, payload: data.result[0].totalWeight});
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getRecyclableThisMonth = () => async (dispatch) => {
    try {
        const {data} = await api.getRecyclableThisMonth();
        dispatch({type: RECYCLABLE_COUNT, payload: data.result[0].totalWeight});
        
    } catch (error) {
        console.log(error.message);
    }
}