var mongoose = require("mongoose");
var todoSchema = mongoose.Schema({
    text: String,
    completed: Boolean
});

module.exports = mongoose.model("todo", todoSchema);