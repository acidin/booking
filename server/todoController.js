var Todo = require("./todo");

var router = require("express").Router();
router.route("/todos/:id?").get(getTodos).post(addTodo).delete(deleteTodo);

function getTodos(req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
}

function addTodo(req, res) {
    var todo = new Todo(Object.assign({}, req.body));
    todo.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
}

function deleteTodo(req, res) {
    var id = req.params.id;
    Todo.remove({_id: id}, function (err, removed) {
        if (err) {
            res.send(err);
        } else {
            res.json(removed);
        }
    });
}

module.exports = router;