var mongoose = require("mongoose")
var eventSchema = mongoose.Schema({
    text: String
})

module.exports = mongoose.model("event", eventSchema)