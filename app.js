require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

global.__basedir = __dirname;
const rotaquestoes = require('./routes/questoes');
const rotausuarios = require('./routes/usuarios');
const rotalogin = require('./routes/login');
const rotalogout = require('./routes/logout');
const rotaperfil = require('./routes/perfil');
const rotahome = require('./routes/home')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 



app.use('/questoes', rotaquestoes);
app.use('/usuarios', rotausuarios);
app.use('/login', rotalogin);
app.use('/logout', rotalogout);
app.use('/perfil', rotaperfil);
app.use('/home', rotahome)


// app.get('/cadastro', (req, res) => {
//     res.sendFile(__dirname + '/public/pages/cadastro.html');
// });





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.use(express.static(__dirname+'/public'));



module.exports = app;