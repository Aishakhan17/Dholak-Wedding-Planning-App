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
    const result = await boardFunctions.createBoard(newBoard)
    return res.json(result)
})


router.post("/get-boards", async (req, res) => {
    const boards = await boardFunctions.getUserBoards(req.body)
    return res.json(boards)
})

router.post("/board", async (req, res) => {
    var id = req.body.id
    const boardData = await boardFunctions.getBoardData(id)
    return res.json(boardData)
})

router.post("/board-images", async (req, res) => {
    console.log("req.body from board-images", req.body)
    let result = await boardFunctions.getBoardImages(req.body.id)
    return res.json(result)
})

router.post("/get-public-boards", async (req, res) => {
    const id = req.body.id
    const publicBoardData = await boardFunctions.getPublicBoardData(id)
    return res.json(publicBoardData)
})


router.post("/add-image", upload.single("boardImage"), async (req, res, next) => {
    let boardId = req.body.boardId
    let newImage = {
        board: boardId,
        image: {
            data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
            contentType: "image/png/jpg/jpeg"
        }
    }
    let upload = await boardFunctions.addImages(boardId, newImage)
    return res.json(upload)
})


module.exports = router