const express = require("express")
const router = express.Router()
const { OAuth2Client} = require('google-auth-library');



router.get('/', (req,res) => {
    res.json("home")  
})
module.exports = router