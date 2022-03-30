import { AUTH, USERS, MESSAGE, MESSAGE_TYPE, LOGOUT, ACTIVATE, COLLECTORS, USER_STREETS } from '../../components/constants/actionTypes'
import * as api from '../api/index'

export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await api.getUsers();
        dispatch({type: USERS, payload: data});
        
    } catch (error) {
        console.log(error.message);
    }
    
}

export const getCollectors = () => async (dispatch) => {
    try {
        const {data} = await api.getCollectors();
        dispatch({type: COLLECTORS, payload: data});
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = (updated) => async (dispatch) => {
    try {
        console.log(updated)
        await api.updateUser(updated);
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = (deleted) => async (dispatch) => {
    try {
        await api.deleteUser(deleted);
    } catch (error) {
        console.log(error)
    }
}


export const signin = (formData, nav) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData)
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
            dispatch({type: AUTH, data})
            nav('/')
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, nav) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData)
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
            dispatch({type: AUTH, data})
            nav('/')
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const activate = (token, nav) => async(dispatch) => {
    try {
        const {data} = await api.activate(token)
        const msg = data.message
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            const profile = data.result
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
            nav('/')
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const updateImage = (image) => async (dispatch) => {
    try {
        const {data} = await api.updateImage(image);
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            console.log(msg)
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const updateCredentials = (credentials) => async (dispatch) => {
    try {
        const {data} = await api.updateCredentials(credentials);
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            console.log(msg)
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = (password) => async (dispatch) => {
    try {
        const {data} = await api.changePassword(password);
        if(data.success == false){
            const msg = data.message
            dispatch({type: MESSAGE_TYPE, payload: 'error'})
            dispatch({type: MESSAGE, payload: msg})
            
        } else{
            const msg = data.message
            console.log(msg)
            dispatch({type: MESSAGE_TYPE, payload: 'success'})
            dispatch({type: MESSAGE, payload: msg})
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUserStreets = () => async (dispatch) => {
    try {
        const {data} = await api.getUserStreets()
        dispatch({type: USER_STREETS, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}