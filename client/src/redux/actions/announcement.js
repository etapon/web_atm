import { START_LOADING, END_LOADING, ANNOUNCEMENTS, CREATE_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, MESSAGE, MESSAGE_TYPE, FETCH_BY_SEARCH_ANNOUNCEMENT } from '../../components/constants/actionTypes'
import * as api from '../api/index'

export const getAnnouncements = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const {data} = await api.getAnnouncements(page);
        dispatch({type: ANNOUNCEMENTS, payload: data});
        console.log(data)
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
    
}

export const createAnnouncement = (announcement) => async (dispatch) => {
    try {
        const {data} = await api.createAnnouncement(announcement)
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            console.log(msg)
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
            dispatch({type: CREATE_ANNOUNCEMENT, payload: data.result})
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const updateAnnouncement = (id, announcement) => async (dispatch) => {
    try {
        const {data} = await api.updateAnnouncement(id, announcement);
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            console.log(msg)
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
            dispatch({type: UPDATE_ANNOUNCEMENT, payload: data.result});
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnnouncement = (id) => async (dispatch) => {
    try {
        await api.deleteAnnouncement(id)
        
        dispatch({type: MESSAGE_TYPE, payload: 'success'})
        dispatch({type: MESSAGE, payload: 'Successfuly Deleted'})
        dispatch({type: DELETE_ANNOUNCEMENT, payload: id})
        
        
    } catch (error) {
        console.log(error)
    }
}

export const getAnnouncementsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const { data: {data}} = await api.getAnnouncementsBySearch(searchQuery)
        dispatch({type: FETCH_BY_SEARCH_ANNOUNCEMENT, payload: {data}})

        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error)
    }
}