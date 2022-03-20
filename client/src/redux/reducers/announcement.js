import { ANNOUNCEMENTS, START_LOADING, END_LOADING, UPDATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT } from '../../components/constants/actionTypes';

const announcementReducer = (state = {isLoading: true, announcements: []}, action) => {
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case ANNOUNCEMENTS:
            return {
                ... state,
                announcements: action.payload.data,
                currentPage: action.payload.numberOfPage,
                numberOfPages: action.payload.numberOfPages
                }
        case UPDATE_ANNOUNCEMENT:
            return { ...state, announcements: state.announcements.map((announcement)=> announcement._id === action.payload._id ? action.payload: announcement)}
        case DELETE_ANNOUNCEMENT:
            return { ...state, announcements: state.announcements.filter((announcement)=> announcement._id !== action.payload)}
        default:
            return state;
    }
}

export default announcementReducer;