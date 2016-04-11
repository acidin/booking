import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL,
    CLEAR_COMPLETED,
    RECEIVE_TODOS
} from '../constants/ActionTypes'

const initialState = [
    {
        id: 0,
        text: 'TODO',
        completed: false
    }
]

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                action.todo,
                ...state
            ]

        case DELETE_TODO:
            return state.filter(todo =>
                todo.id !== action.id
            )

        case EDIT_TODO:
            return state.map(todo =>
                todo.id === action.todo.id ? action.todo : todo
            )

        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.todo.id ? action.todo : todo
            )

        case COMPLETE_ALL:
            return state.map(todo =>
                action.todos.find(t => t.id === todo.id) || todo
            )

        case CLEAR_COMPLETED:
            return state.filter(todo => todo.completed === false)

        case RECEIVE_TODOS:
            return state = action.todos

        default:
            return state
    }
}
