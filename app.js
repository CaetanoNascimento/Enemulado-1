const express = require('express');
const app = express();
const bodyParser = require('body-parser');



const rotaquestoes = require('./routes/questoes');
const rotausuarios = require('./routes/usuarios');
const rotagoogle = require('./routes/logingoogle');
global.__basedir = __dirname;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 



app.use('/questoes', rotaquestoes);
app.use('/usuarios', rotausuarios);
app.use('/google', rotagoogle);

app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/pages/login.html');
});

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/pages/cadastro.html');
});

// app.get('/google', (req, res) => {
//     res.sendFile(__dirname + '/public/pages/login.html');
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.use(express.static(__dirname+'/public'));



module.exports = app;