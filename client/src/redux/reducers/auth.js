import { AUTH, LOGOUT, USERS, ACTIVATE, COLLECTORS, USER_STREETS, RESIDENT_COUNT, VERIFICATION} from '../../components/constants/actionTypes';

const authReducer = (state = {userStreets:[], allUsers: [], authData: null, collectors: [], residentCount: null, verification: []}, action) => {
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
        case RESIDENT_COUNT:
            return {...state, residentCount: action.payload}
        case VERIFICATION:
            return {...state, verification: action.payload}
        default:
            return state;
    }
}

export default authReducer;