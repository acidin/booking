var bodyParser = require("body-parser")
var mongoose = require("mongoose")
//controllers
var todoController = require("./server/todoController")
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./app/webpack.config.js')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/app/dev.html')
})

app.use(bodyParser.json())
app.use("/api", todoController);

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})

mongoose.connect("mongodb://localhost/todo")