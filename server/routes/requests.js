const express = require("express") 
const router = express.Router()
const Board = require("../models/Board")
const User = require("../models/User")
const Requests = require("../models/Requests")

router.post("/add-members", async (req, res) => {
    const board = await Board.findById(req.body.boardId.boardId)
    const user = await User.findById(req.body.id)  

    if (board) {
        for (i in board.participants) {
            if (board.participants[i].toString() === req.body.id) {
                return res.json({error: "User already a member"})
            }
        }
        board.participants.push(user)
        board.save()
        participants = await board.populate({
            path: "participants", 
            model: "User",
            select: "firstName lastName _id image email"
        })
        return res.json(board.participants)
    } 
    else {
        return res.json({error: "Something went Wrong"})
    }
})

module.exports = router