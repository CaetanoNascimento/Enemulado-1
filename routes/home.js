const router = require('express').Router();


router.get('/', (req,res)=>{
    res.sendFile(__basedir + '/public/pages/home.html');
 
})

module.exports = router;