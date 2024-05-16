const express = require("express")
const router = express.Router()
const cardFunctions = require("../controllers/listAndCardController")


router.post("/create-card", async (req, res) => {
    let list = req.body.id 
    let title = req.body.cardTitle
    try {
        let result = await cardFunctions.createCard(list, title)
        return res.json(result)
    } catch (error) {
        return error
    }  
})

router.post("/get-cards", async (req, res) => {
    let result = await cardFunctions.getCards(req.body.id)
    return res.json(result)

})
module.exports = router