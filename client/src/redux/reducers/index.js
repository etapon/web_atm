import { combineReducers } from "redux"

import auth from './auth'
import schedule from './schedule'
import announcement from './announcement'
import barangay from './barangay'
import message from './message'
import collection from './collection'

export default combineReducers({ auth, schedule, announcement, barangay, message, collection })