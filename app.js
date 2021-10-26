const express = require('express');
const path = require('path');
const handler_route = require('./routes/handler')



const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// sendFile will go here
//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, '/public'));
//});

app.use(express.static(__dirname + '/public'));
app.use('/save', handler_route);

app.listen(port);
console.log('Server started at http://localhost:' + port);

module.exports = app;