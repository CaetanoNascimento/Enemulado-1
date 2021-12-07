const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {

        //const decode = jwt.verify(token, process.env.JWT_KEY);
        jwt.verify(token, process.env.JWT_KEY, function(err, decode){
          if(err){

           
            res.status(401).send({mensagem: "Falha na autenticacao"})

           // res.redirect("/");


          }else{

            req.usuario = decode;
            
            next();
            console.log('aqui 000')

          }

        });
       

    } catch (error) {

      //  res.status(401).send({mensagem: "Falha na autenticacao"})

      res.redirect("/");


    }


}