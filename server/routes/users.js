const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Board = require("../models/Board")
const fs = require('fs');
const path = require('path');
const multer = require("multer")
const userFunctions = require("../controllers/userController")


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

router.post("/user", async (req, res) => {
    const id = req.body.id 
    const user = await User.findById(id)
    if (user) {
        return res.json({firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image, id: user._id})
    }
})

router.post("/get-users", async (req, res) => {
    console.log(req.body)
    query = req.body.name
    let result = {}
    let board = await Board.findById(req.body.boardId)
    let users = await User.find({$or: [{firstName: {"$regex": `${query}`, "$options": "i"}}, {lastName: {"$regex": `${query}`, "$options": "i"}}, {email: {"$regex": `${query}`, "$options": "i"}}]})
    if (Object.keys(users).length !== 0) {
        Object.keys(users).map((i) => {
            if (users[i]._id.toString() !== req.body.currentUser && (board.participants.indexOf(users[i]._id) === -1)) {
                result[i] = {firstName: users[i].firstName, lastName: users[i].lastName, id: users[i]._id, image: users[i].image}
            }
        })
    }
    return res.json(result)
})

router.post("/upload-picture", upload.single("profilePicture"), async (req, res, next) => {
    let newProfilePicture = {
        id: req.body.userId,
        image: {
            data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
            contentType: "image/png/jpg/jpeg"
        }
    }
    let upload = await userFunctions.profilePictureUpdate(newProfilePicture)
    return res.json(upload)
})

router.post("/get-profile-picture", async (req, res) => {
    let picture = await userFunctions.getProfilePicture(req.body.userId)
    return res.json(picture)
})

module.exports = router