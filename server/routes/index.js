const express = require("express")
const router = express.Router()
const { OAuth2Client} = require('google-auth-library');



router.get('/', (req,res) => {
    res.send("express on vercel")  
})
module.exports = router