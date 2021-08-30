const router = require('express').Router();
const login = require('../middleware/login_jwt');



router.get('/entrar', login,(req,res)=>{
    
    console.log(req.usuario)

    console.log("entrou na rota")
    console.log(req.body)

    return res.status(200).send({Ebaa:"ebba"})
 
})

module.exports = router;