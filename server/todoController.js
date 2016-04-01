var util = require('util')
var async = require('async')
var Todo = require("./todo")

var router = require("express").Router()
router.route("/todos").get(getTodos).post(addTodo).patch(updateTodos)
router.route("/todos/:id").delete(deleteTodo).patch(updateTodo)

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

function updateTodos(req, res) {
    var ids = req.body.ids
    var completed = req.body.completed
    var newTodos = []
    async.eachSeries(ids, function (id, cb) {
        Todo.findOneAndUpdate({_id: id}, {completed}, {
            new: true
        }, (err, todo) => {
            if (!err) {
                newTodos.push(todo)
                cb()
            }
        })
    }, function(err) {
        res.json(getResult(err, newTodos))
    });
}

module.exports = router