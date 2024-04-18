const express = require("express")
const router = express.Router()
const User = require("../models/User")



router.post("/user", async (req, res) => {
    const id = req.body.id 
    const user = await User.findById(id)
    if (user) {
        // console.log(user)
        return res.json({firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image, id: user._id})
    }
})

router.post("/get-users", async (req, res) => {
    query = req.body.name
    let result = {}
    let users = await User.find({$or: [{firstName: {"$regex": `${query}`, "$options": "i"}}, {lastName: {"$regex": `${query}`, "$options": "i"}}, {email: {"$regex": `${query}`, "$options": "i"}}]})
    if (Object.keys(users).length !== 0) {
        Object.keys(users).map((i) => {
            if (users[i]._id.toString() !== req.body.currentUser) {
                result[i] = {firstName: users[i].firstName, lastName: users[i].lastName, id: users[i]._id, image: users[i].image}
            }
        })
    }
    return res.json(result)
})



module.exports = router