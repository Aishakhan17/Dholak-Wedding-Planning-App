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
    // console.log("req.body from boards")
    // console.log("storage", storage)

    let newBoard = {
        title: req.body.title,
        description: req.body.description,
        cover: {
            data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
            contentType: "image/png/jpg/jpeg"
        },
        owner: req.body.owner,
        private: req.body.private
    }
    // console.log("newBoard", newBoard, newBoard.owner, typeof newBoard.owner)
    const result = await boardFunctions.createBoard(newBoard)
    // console.log("result", result)
    return res.json(result)
})


router.post("/get-boards", async (req, res) => {
    // console.log("req.body", req.body)
    const boards = await boardFunctions.getUserBoards(req.body)
    // console.log("router boards", boards)
    return res.json(boards)
})

router.post("/board", async (req, res) => {
    console.log(req.body)
    var id = req.body.boardId.boardId
    console.log(id)
    const boardData = await boardFunctions.getBoardData(id)
    // // console.log(boardData)
    return res.json(boardData)
})

router.post("/get-public-boards", async (req, res) => {
    const id = req.body.id
    const publicBoardData = await boardFunctions.getPublicBoardData(id)
    // console.log("publicBoardData", publicBoardData)
    // console.log("board router", req.body.id, typeof req.body.id)
    return res.json(publicBoardData)
})


module.exports = router