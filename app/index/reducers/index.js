import { combineReducers } from 'redux'
import todos from './todos'
import events from './events'
import appStatus from './appstatus'

const rootReducer = combineReducers({
    todos,
    events,
    appStatus
})

export default rootReducer
