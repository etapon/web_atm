import { BIO_COUNT_TODAY, NON_BIO_COUNT_TODAY, RECYCLABLE_COUNT_TODAY, 
    TOTAL_COLLECTED, BIODEGRADABLE_DYNAMIC, BIO_COUNT_MONTH, BIO_COUNT_YEAR,
    BIO_SORTED, NON_BIODEGRADABLE_DYNAMIC, NON_BIO_COUNT_MONTH, NON_BIO_COUNT_YEAR, 
    NON_BIO_SORTED, 
    RECYCLABLE_DYNAMIC,
    RECYCLABLE_COUNT_MONTH,
    RECYCLABLE_COUNT_YEAR,
    RECYCLABLE_SORTED,
    COLLECTED_COUNT_MONTH,
    COLLECTED_COUNT_YEAR,
    COLLECTED_SORTED,
    COLLECTED_COUNT_TODAY,
    COLLECTED_WASTE_TYPE} from '../../components/constants/actionTypes'

import * as api from '../api/index'

export const getBiodegradablesToday = () => async (dispatch) => {
    try {
        const {data} = await api.getBiodegradablesToday()
        dispatch({type: BIO_COUNT_TODAY, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getNonBiodegradablesToday = () => async (dispatch) => {
    try {
        const {data} = await api.getNonBiodegradablesToday()
        dispatch({type: NON_BIO_COUNT_TODAY, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getRecyclablesToday = () => async (dispatch) => {
    try {
        const {data} = await api.getRecyclablesToday();
        dispatch({type: RECYCLABLE_COUNT_TODAY, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getTotalPerStreetToday = () => async (dispatch) => {
    try {
        const {data} = await api.getTotalPerStreetToday()
        dispatch({type: TOTAL_COLLECTED, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}


// ==========================================================================================



export const getBiodegradableDynamic = (filter) => async (dispatch) => {
    try {
        const {data} = await api.getBiodegradableDynamic(filter)
        dispatch({type: BIODEGRADABLE_DYNAMIC, payload:data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getBiodegradablesThisMonth = () => async (dispatch) => {
    try {
        const {data} = await api.getBiodegradablesThisMonth()
        dispatch({type: BIO_COUNT_MONTH, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getBiodegradablesThisYear = () => async (dispatch) => {
    try {
        const {data} = await api.getBiodegradablesThisYear()
        dispatch({type: BIO_COUNT_YEAR, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getBiodegradableSorted = () => async (dispatch) => {
    try {
        const {data} = await api.getBiodegradableSorted()
        dispatch({type: BIO_SORTED, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}


// ==========================================================================================


export const getNonBiodegradableDynamic = (filter) => async (dispatch) => {
    try {
        const {data} = await api.getNonBiodegradableDynamic(filter)
        dispatch({type: NON_BIODEGRADABLE_DYNAMIC, payload:data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getNonBiodegradablesThisMonth = () => async (dispatch) => {
    try {
        const {data} = await api.getNonBiodegradablesThisMonth()
        dispatch({type: NON_BIO_COUNT_MONTH, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getNonBiodegradablesThisYear = () => async (dispatch) => {
    try {
        const {data} = await api.getNonBiodegradablesThisYear()
        dispatch({type: NON_BIO_COUNT_YEAR, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getNonBiodegradableSorted = () => async (dispatch) => {
    try {
        const {data} = await api.getNonBiodegradableSorted()
        dispatch({type: NON_BIO_SORTED, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

// ==========================================================================================



export const getRecyclableDynamic = (filter) => async (dispatch) => {
    try {
        const {data} = await api.getRecyclableDynamic(filter)
        dispatch({type: RECYCLABLE_DYNAMIC, payload:data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getRecyclablesThisMonth = () => async (dispatch) => {
    try {
        const {data} = await api.getRecyclablesThisMonth()
        dispatch({type: RECYCLABLE_COUNT_MONTH, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getRecyclablesThisYear = () => async (dispatch) => {
    try {
        const {data} = await api.getRecyclablesThisYear()
        dispatch({type: RECYCLABLE_COUNT_YEAR, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getRecyclableSorted = () => async (dispatch) => {
    try {
        const {data} = await api.getRecyclableSorted()
        dispatch({type: RECYCLABLE_SORTED, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}


// ==========================================================================================
export const getCollectedToday = () => async (dispatch) => {
    try {
        const {data} = await api.getCollectedToday()
        dispatch({type: COLLECTED_COUNT_TODAY, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getCollectedThisMonth = () => async (dispatch) => {
    try {
        const {data} = await api.getCollectedThisMonth()
        dispatch({type: COLLECTED_COUNT_MONTH, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getCollectedThisYear = () => async (dispatch) => {
    try {
        const {data} = await api.getCollectedThisYear()
        dispatch({type: COLLECTED_COUNT_YEAR, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getCollectedSorted = () => async (dispatch) => {
    try {
        const {data} = await api.getCollectedSorted()
        dispatch({type: COLLECTED_SORTED, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}

export const getCollectedWasteType = (filter) => async (dispatch) => {
    try {
        const {data} = await api.getCollectedWasteType(filter)
        dispatch({type: COLLECTED_WASTE_TYPE, payload: data.result})
    } catch (error) {
        console.log(error.message)
    }
}



