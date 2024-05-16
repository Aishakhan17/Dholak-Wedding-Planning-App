const express = require("express")
const router = express.Router()
const listFunctions = require("../controllers/listAndCardController")


router.post("/create-list", async (req, res) => {
    try {
        const result = await listFunctions.createList(req.body.boardId, req.body.listTitle)
        return res.json(result)        
    } catch (error) {
        return error
    }
})


router.post("/get-lists", async (req, res) => {
    const result = await listFunctions.getBoardLists(req.body.boardId)
    return res.json(result)
})


module.exports = router