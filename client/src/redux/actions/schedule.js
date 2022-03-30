import { START_LOADING, END_LOADING, SCHEDULES, SCHEDULE, CREATE_SCHEDULE, UPDATE_SCHEDULE, DELETE_SCHEDULE, 
    MESSAGE, MESSAGE_TYPE, FETCH_BY_SEARCH_SCHEDULES, SCHED_TODAY } from '../../components/constants/actionTypes'
import * as api from '../api/index'

export const getSchedules = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const {data} = await api.getSchedules(page);
        dispatch({type: SCHEDULES, payload: data});

         dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
    
}

export const getSchedule = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.getSchedule(id);
      dispatch({ type: SCHEDULE, payload: data  });

      dispatch({type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
}

export const createSchedule = (schedule) => async (dispatch) => {
    try {
        const {data} = await api.createSchedule(schedule)
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            console.log(msg)
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
            dispatch({type: CREATE_SCHEDULE, payload: data.result})
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const updateSchedule = (id, schedule) => async (dispatch) => {
    try {
        const {data} = await api.updateSchedule(id, schedule);
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            console.log(msg)
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
            dispatch({type: UPDATE_SCHEDULE, payload: data.result});
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteSchedule = (id) => async (dispatch) => {
    try {
        await api.deleteSchedule(id)
        dispatch({type: MESSAGE_TYPE, payload: 'success'})
        dispatch({type: MESSAGE, payload: 'Schedule Successfuly Deleted'})
        dispatch({type: DELETE_SCHEDULE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const getSchedulesBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const { data: {data}} = await api.getSchedulesBySearch(searchQuery)
        dispatch({type: FETCH_BY_SEARCH_SCHEDULES, payload: {data}})

        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error)
    }
}

export const getSchedToday = () => async (dispatch) => {
    try {
        const {data} = await api.getSchedToday()
        dispatch({type:SCHED_TODAY, payload: data.result[0]})
    } catch (error) {
        console.log(error.message)
    }
}