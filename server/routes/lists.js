const express = require("express")
const router = express.Router()
const listFunctions = require("../controllers/listAndCardController")


router.post("/create-list", async (req, res) => {
    const result = await listFunctions.createList(req.body.boardId, req.body.listTitle)
    return res.json(result)
})


router.post("/get-lists", async (req, res) => {
    const result = await listFunctions.getBoardLists(req.body.boardId)
    console.log("list result", result)
})


module.exports = router