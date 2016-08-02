var mongoose = require("mongoose")
var eventSchema = mongoose.Schema({
    title: String
})

module.exports = mongoose.model("event", eventSchema)