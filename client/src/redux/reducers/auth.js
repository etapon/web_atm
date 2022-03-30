import { AUTH, LOGOUT, USERS, ACTIVATE, COLLECTORS, USER_STREETS} from '../../components/constants/actionTypes';

const authReducer = (state = {userStreets:[], allUsers: [], authData: null, collectors: []}, action) => {
    switch(action.type){
        case USERS:
            return { ...state, allUsers: action.payload }
        case USER_STREETS:
            return { ...state, userStreets: action.payload }
        case COLLECTORS:
            return { ...state, collectors: action.payload }
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data};
        case ACTIVATE:
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            return {...state, authData: action.payload};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null}
        default:
            return state;
    }
}

export default authReducer;