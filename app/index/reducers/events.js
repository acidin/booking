import {
    ADD_EVENT,
    RECEIVE_EVENTS

} from '../constants/ActionTypes'

const initialState = [
    {
        id: 0
    }
]

export default function events(state = initialState, action) {
    switch (action.type) {
        case ADD_EVENT:
            return [
                action.event,
                ...state
            ]

        case RECEIVE_EVENTS:
            return state = action.events


        default:
            return state
    }
}
