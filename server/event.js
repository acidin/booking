var mongoose = require("mongoose")
var eventSchema = mongoose.Schema({
    title: String,
    start: Date
})

module.exports = mongoose.model("event", eventSchema)