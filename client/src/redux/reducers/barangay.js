import { BARANGAYS } from '../../components/constants/actionTypes';

const barangayReducer = (state = {barangays: []}, action) => {
    switch(action.type){
        case BARANGAYS:
            return { ...state, barangays: action.payload }
        default:
            return state;
    }
}

export default barangayReducer;