const express = require("express")
const router = express.Router()
const { OAuth2Client} = require('google-auth-library');
const authFunctions = require("../controllers/userController")



const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET



router.post('/google', async (req, res) => {
    const client = new OAuth2Client(
    clientId,
    clientSecret,
    'postmessage',
    );
     
    async function verify(clientId) {
        const { tokens }  = await client.getToken(req.body.code);
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: clientId,
        });
        const payload = await ticket.getPayload();
        console.log("payload", payload)
        if (payload.email_verified) {
            let userDetails = await authFunctions.googleUserCheck(payload)
                if (userDetails) {
                    console.log("userDetails", userDetails)
                    createSession(req, res, userDetails)
                    return res.json(userDetails)
                }
        }
    }
    verify().catch(console.error)

    function createSession(req, res, userDetails) {
        // console.log("req.user", req, req.user)
        req.session.user = userDetails
        console.log(req.session.user)
    }

});

router.post('/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})

router.post("/login", async (req, res) => {
    const data = req.body
    console.log("data", data)
    const manualUserDetails = await authFunctions.manaulUserCheck(data)
        console.log("manualUserDetails", typeof manualUserDetails, manualUserDetails)
        if (!("error" in manualUserDetails) && manualUserDetails !== null) {
            createSession(req, res, manualUserDetails)
            return res.json(manualUserDetails)
        }
        else if ("error" in manualUserDetails) {
            return res.json(manualUserDetails)
        }
    function createSession(req, res, manualUserDetails) {
        // console.log("req.user", req.user)
        req.session.user = manualUserDetails
    }
})

router.post("/signup", async (req, res) => {
    const data = req.body
    const manualSignupDetails = await authFunctions.newSignUp(data)
    console.log("manualSignupDetails", manualSignupDetails)
    // if () {

    // }
    if (!("error" in manualSignupDetails) && manualSignupDetails !== null) {
        //don't create session if error in manual sign up details
        createSession(req, res, manualSignupDetails)
        return res.json(manualSignupDetails)
    }
    return res.json(manualSignupDetails)

    function createSession(req, res, manualSignupDetails) {
        // console.log("req.user", req.user)
        req.session.user = manualSignupDetails
    }
})



module.exports = router