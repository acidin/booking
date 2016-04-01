var util = require('util')
var Todo = require("./todo")

var router = require("express").Router()
router.route("/todos/:id?").get(getTodos).post(addTodo).delete(deleteTodo).put(updateTodo)

var SUCCESS_CODE = 200
var FAILED_CODE = 500

function successWrap(result) {
    return {
        code: SUCCESS_CODE,
        message: 'success',
        result
    }
}

function failedWrap(err) {
    return {
        code: FAILED_CODE,
        message: err.message,
        result: err
    }
}

function getResult(err, result) {
    var json = {}
    if (err) {
        json = failedWrap(err)
    } else {
        json = successWrap(result)
    }
    return json
}

function getTodos(req, res) {
    Todo.find((err, todos) => {
        res.json(getResult(err, todos))
    })
}

function addTodo(req, res) {
    var todo = new Todo(Object.assign({}, req.body))
    todo.save(err => {
        res.json(getResult(err, todo))
    })
}

function deleteTodo(req, res) {
    var id = req.params.id
    Todo.remove({_id: id}, (err, removed) => {
        res.json(getResult(err, removed))
    })
}

function updateTodo(req, res) {
    var id = req.params.id
    var todo = {}
    if (!util.isUndefined(req.body.text)) {
        todo.text = req.body.text
    }
    if (!util.isUndefined(req.body.completed)) {
        todo.completed = req.body.completed
    }
    Todo.findOneAndUpdate({_id: id}, todo, {
        new: true
    }, (err, todo) => {
        res.json(getResult(err, todo))
    })
}

module.exports = router