const express = require("express")
const router = express.Router()
const User = require("../models/User")



router.post("/user", async (req, res) => {
    const id = req.body.id 
    const user = await User.findById(id)
    if (user) {
        console.log(user)
        return res.json({firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image})
    }
})

router.post("/get-users", async (req, res) => {
    query = req.body.name
    let result = {}
    console.log("query", query)
    let users = await User.find({$or: [{firstName: {"$regex": `${query}`, "$options": "i"}}, {lastName: {"$regex": `${query}`, "$options": "i"}}, {email: {"$regex": `${query}`, "$options": "i"}}]})
    console.log(users, typeof users)
    if (Object.keys(users).length !== 0) {
        Object.keys(users).map((i) => {
             result[i] = {firstName: users[i].firstName, lastName: users[i].lastName, id: users[i]._id, image: users[i].image}
        })
    }
    return res.json(result)
    // var userList = {}
    // Object.keys(users).map((i) => {
    //     userList[i] = {firstName: users[i].firstName, lastName: users[i].lastName, image: users[i].image, id: users[i]._id, email: users[i].email}
    // })
    // return res.json(userList)
})



module.exports = router