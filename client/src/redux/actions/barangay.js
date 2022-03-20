import { BARANGAYS } from '../../components/constants/actionTypes'
import * as api from '../api/index'

export const getBarangays = () => async (dispatch) => {
    try {
        const {data} = await api.getBarangays();
        dispatch({type: BARANGAYS, payload: data});
        
    } catch (error) {
        console.log(error.message);
    }
    
}