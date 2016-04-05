import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

const JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function _addTodo(todo) {
    return {type: types.ADD_TODO, todo}
}

export function addTodo(text) {
    return dispatch => {
        return fetch(`/api/todos/`, {
            headers: JSON_HEADERS,
            method: 'POST',
            body: JSON.stringify({text, completed: false})
        }).then(response => response.json())
            .then(json => dispatch(_addTodo(json.result)))
    }
}

function _deleteTodo(id) {
    return {type: types.DELETE_TODO, id}
}

export function deleteTodo(id) {
    return dispatch => {
        return fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(json => dispatch(_deleteTodo(id)))
    }
}

function _updateTodo(todo) {
    return {type: types.EDIT_TODO, todo}
}

export function editTodo(id, text) {
    return dispatch => {
        return fetch(`/api/todos/${id}`, {
            headers: JSON_HEADERS,
            method: 'PUT',
            body: JSON.stringify({text})
        }).then(response => response.json())
            .then(json => dispatch(_updateTodo(json.result)))
    }
}

function _completeTodo(todo) {
    return {type: types.COMPLETE_TODO, todo}
}

export function completeTodo(id, completed) {
    return dispatch => {
        return fetch(`/api/todos/${id}`, {
            headers: JSON_HEADERS,
            method: 'PUT',
            body: JSON.stringify({completed: completed})
        }).then(response => response.json())
            .then(json => dispatch(_completeTodo(json.result)))
    }
}

function _completeAll(todos) {
    return {type: types.COMPLETE_ALL, todos}
}

export function completeAll(todos) {
    return dispatch => {
        const areAllCompleted = todos.every(todo => todo.completed)
        const ids = todos.filter(todo => {
            return todo.completed === areAllCompleted
        }).map(todo => todo.id)
        return fetch(`/api/todos/`, {
            headers: JSON_HEADERS,
            method: 'PUT',
            body: JSON.stringify({ids, completed: !areAllCompleted})
        }).then(response => response.json())
            .then(json => dispatch(_completeAll(json.result)))
    }
}

export function clearCompleted() {
    return {type: types.CLEAR_COMPLETED}
}

function requestTodos() {
    return {
        type: types.REQUEST_TODOS
    }
}

function receiveTodos(json) {
    return {
        type: types.RECEIVE_TODOS,
        todos: json.result
    }
}

export function fetchTodos() {
    return dispatch => {
        dispatch(requestTodos())
        return fetch(`/api/todos/`)
            .then(response => response.json())
            .then(json => dispatch(receiveTodos(json)))
    }
}
