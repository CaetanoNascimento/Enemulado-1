const express = require('express');
const router = express.Router();

router.get('/400', (req, res) => {
    res.sendFile(__basedir + '/public/pages/400.html');
});

router.get('/404', (req, res) => {
    res.sendFile(__basedir + '/public/pages/404.html');
});

router.get('/admin', (req, res) => {
    res.sendFile(__basedir + '/public/pages/admin.html');
});

router.get('/admin1', (req, res) => {
    res.sendFile(__basedir + '/public/pages/admin1.html');
});

router.get('/cadastro', (req, res) => {
    res.sendFile(__basedir + '/public/pages/cadastro.html');
});

router.get('/confirmar', (req, res) => {
    res.sendFile(__basedir + '/public/pages/confirmarsenha.html');
});

router.get('/escolha', (req, res) => {
    res.sendFile(__basedir + '/public/pages/escolha.html');
});

router.get('/esqueci', (req, res) => {
    res.sendFile(__basedir + '/public/pages/esqueci.html');
});

router.get('/home', (req, res) => {
    res.sendFile(__basedir + '/public/pages/home.html');
});

router.get('/login', (req, res) => {
    res.sendFile(__basedir + '/public/pages/login.html');
});

router.get('/nota', (req, res) => {
    res.sendFile(__basedir + '/public/pages/nota.html');
});

router.get('/perfil', (req, res) => {
    res.sendFile(__basedir + '/public/pages/perfil.html');
});

router.get('/quemsomos', (req, res) => {
    res.sendFile(__basedir + '/public/pages/quemsomos.html');
});





module.exports = router;