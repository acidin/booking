var mongoose = require("mongoose")
var eventSchema = mongoose.Schema({
    title: String,
    start: Date,
    end: Date
})

module.exports = mongoose.model("todo", eventSchema)