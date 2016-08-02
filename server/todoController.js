var util = require('util')
var async = require('async')
var Todo = require("./todo")
var EventBook = require("./event")

var router = require("express").Router()
router.route("/todos").get(getTodos).post(addTodo).put(updateTodos)
router.route("/todos/:id").delete(deleteTodo).put(updateTodo)

router.route("/events").get(getEvents).post(addEvent).put(updateEvents)
router.route("/events/:id").delete(deleteEvent).put(updateEvent)

var SUCCESS_CODE = 200
var FAILED_CODE = 500

function convertTodos(todos) {
    if (Array.isArray(todos)) {
        return todos.map(todo => {
            return {
                id: todo._id,
                text: todo.text,
                completed: todo.completed
            }
        })
    } else {
        return {
            id: todos._id,
            text: todos.text,
            completed: todos.completed
        }
    }
}

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
        res.json(getResult(err, convertTodos(todos.reverse())))
    })
}

function addTodo(req, res) {
    var todo = new Todo(Object.assign({}, req.body))
    todo.completed = false
    todo.save(err => {
        res.json(getResult(err, convertTodos(todo)))
    })
}

function deleteTodo(req, res) {
    var id = req.params.id
    Todo.remove({_id: id}, (err, removed) => {
        res.json(getResult(err, {id: id}))
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
        res.json(getResult(err, convertTodos(todo)))
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
        res.json(getResult(err, convertTodos(newTodos)))
    });
}




function convertEvents(events) {
    if (Array.isArray(events)) {
        return events.map(event => {
            return {
                id: event._id,
                title: event.title/*,
                 start: event.start,
                 end: event.end*/
            }
        })
    } else {
        return {
            id: events._id,
            title: events.title/*,
             start: events.start,
             end: events.end*/
        }
    }
}


function getEvents(req, res) {
    EventBook.find((err, events) => {
        res.json(getResult(err, convertEvents(events.reverse())))
    })
}

function addEvent(req, res) {
    var event = new EventBook(Object.assign({}, req.body))
    event.title = 'sssssss'
    /*    event.start = '06-06-2016'
     event.end = '06-06-2016'*/
    event.save(err => {
        res.json(getResult(err, convertEvents(event)))
    })
}

function deleteEvent(req, res) {
    var id = req.params.id
    EventBook.remove({_id: id}, (err, removed) => {
        res.json(getResult(err, {id: id}))
    })
}

function updateEvent(req, res) {
    var id = req.params.id
    var event = {}
    if (!util.isUndefined(req.body.title)) {
        event.title = req.body.title
    }
    if (!util.isUndefined(req.body.start)) {
        event.start = req.body.start
    }
    if (!util.isUndefined(req.body.end)) {
        event.end = req.body.end
    }
    EventBook.findOneAndUpdate({_id: id}, event, {
        new: true
    }, (err, event) => {
        res.json(getResult(err, convertEvents(event)))
    })
}

function updateEvents(req, res) {
    var ids = req.body.ids
    var start = req.body.start
    var end = req.body.end
    var newEvents = []
    async.eachSeries(ids, function (id, cb) {
        EventBook.findOneAndUpdate({_id: id}, {start: start}, {end: end}, {
            new: true
        }, (err, event) => {
            if (!err) {
                newEvents.push(event)
                cb()
            }
        })
    }, function(err) {
        res.json(getResult(err, convertEvents(newEvents)))
    });
}


module.exports = router