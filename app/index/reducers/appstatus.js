import {
    REQUEST_TODOS,
    RECEIVE_TODOS,
    REQUEST_EVENTS,
    RECEIVE_EVENTS
} from '../constants/ActionTypes'

const initialState = {
    isFetching: true
}

export default function appStatus(state = initialState, action) {
    switch (action.type) {
        case REQUEST_TODOS:
            return Object.assign({}, initialState, {
                isFetching: true
            })

        case RECEIVE_TODOS:
            return Object.assign({}, initialState, {
                isFetching: false
            })
        case REQUEST_EVENTS:
            return Object.assign({}, initialState, {
                isFetching: true
            })

        case RECEIVE_EVENTS:
            return Object.assign({}, initialState, {
                isFetching: false
            })



        default:
            return state
    }
}
