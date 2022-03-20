import { BIO_COUNT, NON_BIO_COUNT, RECYCLABLE_COUNT } from '../../components/constants/actionTypes';

const collectionReducer = (state = {bioCount: null, nonBioCount: null, recyclableCount:null}, action) => {
    switch(action.type){
        case BIO_COUNT:
            return { ...state, bioCount: action.payload }
        case NON_BIO_COUNT:
            return { ...state, nonBioCount: action.payload }
        case RECYCLABLE_COUNT:
            return { ...state, recyclableCount: action.payload }
        default:
            return state;
    }
}

export default collectionReducer;