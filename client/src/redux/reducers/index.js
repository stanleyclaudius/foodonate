import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import approvalReducer from './approvalReducer'
import eventReducer from './eventReducer'
import ticketReducer from './ticketReducer'
import newsReducer from './newsReducer'
import donatorReducer from './donatorReducer'
import userReducer from './userReducer'
import homeEventReducer from './homeEventReducer'
import donatorEventReducer from './donatorEventReducer'

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  approval: approvalReducer,
  event: eventReducer,
  ticket: ticketReducer,
  news: newsReducer,
  donator: donatorReducer,
  user: userReducer,
  homeEvent: homeEventReducer,
  donatorEvent: donatorEventReducer
})