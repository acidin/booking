var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose')
//controllers
var todoController = require('./server/todoController')
var eventController = require('./server/eventController')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./app/webpack.config.js')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api", todoController);

app.use("/api2", eventController);

app.get("/", function (req, res) {
    var name = req.cookies && req.cookies.name;
    if (!name) {
        res.redirect('/login');
    } else {
        res.sendFile(__dirname + '/app/index.html');
    }
})

app.get("/login", function (req, res) {
    var name = req.cookies && req.cookies.name;
    if (name) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/app/login.html')
    }
})

app.post("/login", function (req, res) {
    var name = req.body.name;
    if (name) {
        res.cookie('name', name);
        res.redirect('/');
    } else {
        res.redirect('/login?error');
    }
})

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})

mongoose.connect("mongodb://localhost/todo")