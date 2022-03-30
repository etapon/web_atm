import { SCHEDULES, SCHEDULE, START_LOADING, END_LOADING, UPDATE_SCHEDULE, DELETE_SCHEDULE, 
    FETCH_BY_SEARCH_SCHEDULES, SCHED_TODAY } from '../../components/constants/actionTypes';

const scheduleReducer = (state = {isLoading: true, schedules: [], schedToday: []}, action) => {
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case SCHEDULES:
            return {
                ... state,
                schedules: action.payload.data,
                currentPage: action.payload.numberOfPage,
                numberOfPages: action.payload.numberOfPages
                }
        case SCHEDULE:
            return { ...state,  schedule: action.payload }
        case FETCH_BY_SEARCH_SCHEDULES:
            return { ...state, schedules: action.payload.data};
        case UPDATE_SCHEDULE:
            return { ...state, schedules: state.schedules.map((schedule)=> schedule._id === action.payload._id ? action.payload: schedule)}
        case DELETE_SCHEDULE:
            return { ...state, schedules: state.schedules.filter((schedule)=> schedule._id !== action.payload)}
        case SCHED_TODAY:
            return { ...state, schedToday: action.payload }
        default:
            return state;
    }
}

export default scheduleReducer;