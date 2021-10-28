const express = require('express');
const path = require('path');
const handler_route = require('./routes/handler')
const overview_route = require('./routes/overview')
const slides_route = require('./routes/slides')

const router = express.Router()

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());





// sendFile will go here
//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, '/public'));
//});

app.use(express.static(__dirname + '/public'));
app.use('/save', handler_route);
app.use('/overview', overview_route)
app.use('/slides', slides_route)

app.listen(port);
console.log('Server started at http://localhost:' + port);

module.exports = app;