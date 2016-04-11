import { combineReducers } from 'redux'
import todos from './todos'
import appStatus from './appstatus'

const rootReducer = combineReducers({
  todos,
  appStatus
})

export default rootReducer
