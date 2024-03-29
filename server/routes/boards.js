const express = require("express")
const router = express.Router()
const boardFunctions = require("../controllers/boardController")
const fs = require('fs');
const path = require('path');
const multer = require("multer")


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


router.post("/create", upload.single("cover"), async (req, res, next) => {
    // const data = req.body
    console.log("req.body from boards", req.body)
    // console.log("storage", storage)

    let newBoard = {
        title: req.body.title,
        description: req.body.description,
        // cover: req.body.cover,
        cover: {
            data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
            contentType: "image/png/jpg/jpeg"
        },
        // cover: req.body.body.cover,
        owner: req.body.owner,
    }
    console.log("newBoard", newBoard)
    const result = await boardFunctions.createBoard(newBoard)
    console.log("result", result)
    return res.json(result)
})


router.post("/get-boards", async (req, res) => {
    // console.log("req.body", req.body)
    const boards = await boardFunctions.getUserBoards(req.body)
    console.log("router boards", boards)
    return res.json(boards)
})

router.post("/board", async (req, res) => {
    var id = req.body.id
    console.log(id)
    const boardData = await boardFunctions.getBoardData(id)
    console.log(boardData)
    return res.json(boardData)
})
module.exports = router