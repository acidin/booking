import {
    ADD_EVENT

} from '../constants/ActionTypes'

const initialState = [
    {
        id: 0,
        title: 'Some text',
        start: '6-6-2016',
        end: '6-6-2016'
    }
]

export default function events(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                action.event,
                ...state
            ]



        default:
            return state
    }
}
