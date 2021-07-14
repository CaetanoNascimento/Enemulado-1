const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false })); // dados simples
app.use(bodyParser.json()); // json de entrada do body



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname+'/public'));

module.exports = app;