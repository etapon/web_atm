import { BIO_COUNT_TODAY, NON_BIO_COUNT_TODAY, RECYCLABLE_COUNT_TODAY, TOTAL_COLLECTED, BIODEGRADABLE_DYNAMIC,
    BIO_COUNT_MONTH, BIO_COUNT_YEAR, BIO_SORTED, NON_BIODEGRADABLE_DYNAMIC, NON_BIO_COUNT_MONTH, NON_BIO_COUNT_YEAR, 
    NON_BIO_SORTED, RECYCLABLE_COUNT_MONTH, RECYCLABLE_COUNT_YEAR, RECYCLABLE_DYNAMIC, RECYCLABLE_SORTED, COLLECTED_COUNT_TODAY, 
    COLLECTED_COUNT_MONTH, COLLECTED_COUNT_YEAR, COLLECTED_SORTED, COLLECTED_WASTE_TYPE, COLLECTED_TIME_FRAME, BIODEGRADABLE_TIME_FRAME,
    NON_BIODEGRADABLE_TIME_FRAME, RECYCLABLE_TIME_FRAME, BIODEGRADABLE_TODAY_REPORT, NON_BIODEGRADABLE_TODAY_REPORT, RECYCLABLE_TODAY_REPORT} from '../../components/constants/actionTypes';


const collectionReducer = (state = {totalCollected: [], biodegradableDynamic: [], nonBiodegradableDynamic: [], recyclableDynamic: [], bioSorted: [], nonBioSorted: [],
    recyclableSorted: [], collectedSorted: [], bioCount: null, nonBioCount: null, recyclableCount:null, collectedCount: null, bioCountThisMonth: null, nonBioCountThisMonth:null, 
    recyclableCountThisMonth: null, collectedCountThisMonth: null, nonBioCountThisYear:null, bioCountThisYear: null, recyclableCountThisYear: null, collectedCountThisYear: null, 
    collectedWasteType: [], collectedTimeFrame: [], biodegradableTimeFrame: [], nonBiodegradableTimeFrame: [], recyclableTimeFrame: [], biodegradableTodayReport: [],
    nonBiodegradableTodayReport: [], recyclableTodayReport: []}, action) => {
    
        switch(action.type){
        case BIO_COUNT_TODAY:
            return { ...state, bioCount: action.payload }
        case NON_BIO_COUNT_TODAY:
            return { ...state, nonBioCount: action.payload }
        case RECYCLABLE_COUNT_TODAY:
            return { ...state, recyclableCount: action.payload }
        case TOTAL_COLLECTED:
            return { ...state, totalCollected: action.payload}

        case BIO_COUNT_MONTH: 
            return { ...state, bioCountThisMonth: action.payload}
        case BIO_COUNT_YEAR: 
            return { ...state, bioCountThisYear: action.payload}
        
        case BIODEGRADABLE_DYNAMIC:
            return { ...state, biodegradableDynamic: action.payload}
        case BIO_SORTED:
            return { ...state, bioSorted: action.payload}

        case NON_BIO_COUNT_MONTH: 
            return { ...state, nonBioCountThisMonth: action.payload}
        case NON_BIO_COUNT_YEAR: 
            return { ...state, nonBioCountThisYear: action.payload}
        case NON_BIODEGRADABLE_DYNAMIC:
            return { ...state, nonBiodegradableDynamic: action.payload}
        case NON_BIO_SORTED:
            return { ...state, nonBioSorted: action.payload}

        case RECYCLABLE_COUNT_MONTH: 
            return { ...state, recyclableCountThisMonth: action.payload}
        case RECYCLABLE_COUNT_YEAR: 
            return { ...state, recyclableCountThisYear: action.payload}
        case RECYCLABLE_DYNAMIC:
            return { ...state, recyclableDynamic: action.payload}
        case RECYCLABLE_SORTED:
            return { ...state, recyclableSorted: action.payload}

        case COLLECTED_COUNT_TODAY:
            return { ...state, collectedCount: action.payload }
        case COLLECTED_COUNT_MONTH: 
            return { ...state, collectedCountThisMonth: action.payload}
        case COLLECTED_COUNT_YEAR:
            return { ...state, collectedCountThisYear: action.payload}
        case COLLECTED_SORTED:
            return { ...state, collectedSorted: action.payload}
        case COLLECTED_WASTE_TYPE:
            return { ...state, collectedWasteType: action.payload}
        case COLLECTED_TIME_FRAME:
            return { ...state, collectedTimeFrame: action.payload}
        case BIODEGRADABLE_TIME_FRAME:
            return { ...state, biodegradableTimeFrame: action.payload}
        case NON_BIODEGRADABLE_TIME_FRAME:
            return { ...state, nonBiodegradableTimeFrame: action.payload}
        case RECYCLABLE_TIME_FRAME:
            return { ...state, recyclableTimeFrame: action.payload}
        case BIODEGRADABLE_TODAY_REPORT:
            return { ...state, biodegradableTodayReport: action.payload}
        case NON_BIODEGRADABLE_TODAY_REPORT:
            return { ...state, nonBiodegradableTodayReport: action.payload}
        case RECYCLABLE_TODAY_REPORT:
            return { ...state, recyclableTodayReport: action.payload}
        default:
            return state;
    }
}

export default collectionReducer;