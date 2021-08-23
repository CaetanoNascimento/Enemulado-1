const express = require('express');
const router = express.Router();

router.get('/400', (req, res) => {
    res.sendFile(__basedir + '/public/pages/400.html');
});

router.get('/404', (req, res) => {
    res.sendFile(__basedir + '/public/pages/404.html');
});

module.exports = router;