import { MESSAGE, MESSAGE_TYPE } from '../../components/constants/actionTypes';

const messageReducer = (state = {message: null, message_type: null}, action) => {
    switch(action.type){
        case MESSAGE:
            return{...state, message: action.payload}
        case MESSAGE_TYPE:
            return{...state, message_type: action.payload}
        default:
            return state;
    }
}

export default messageReducer;