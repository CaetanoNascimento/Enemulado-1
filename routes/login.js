const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '235715095816-g7c1qglfud2isfnbnmukifsuddvn2ubc.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

router.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/login.html');
});

router.post('/', (req,res)=>{
    let token = req.body.token;
    console.log(req.body.token)

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(err=>{
        res.redirect('/login')
    })
     

})

module.exports = router;