const bcrypt = require('bcrypt');
const User = require("../models/User")


async function googleUserCheck(payload) {
    let newUser = {
            id: payload.sub,
            firstName: payload.given_name,
            lastName: payload.family_name,
            userName: payload.name,
            email: payload.email,
            // image: payload.picture,
        }
    try {
        let user = await User.findOne({id: newUser.id})
        if (user) {
            return {id:user._id, firstName: user.firstName, lastName: user.lastName, username: user.userName}
        }
        else {
            console.log("user not found, creating")
            let user = await User.create(newUser)
            return {id:user._id, firstName: user.firstName, lastName: user.lastName, username: user.userName}
        }
    } catch (error) {
        console.error(error)   
    }

}

async function manaulUserCheck(data) {
    let newManualUser = {
        email: data.body.email,
        password: data.body.password
    }
    const saltRounds = 10; 
    try {
        let user = await User.findOne({email: newManualUser.email})
        if (user) {
            console.log("manual user found", user)
            const match = bcrypt.compare(newManualUser.password, user.password)
            console.log("match", match)
            if (match) {
                return ({id:user._id, firstName: user.firstName, lastName: user.lastName, username: user.userName, image: user.image})
            }
            else {
                return {error: "Incorrect Password"}
            }
        }
        else {
            return {error: "User does not exist, please register to login"}
        }
    } catch (error) {
        return {error: error}
    }
}

async function newSignUp(data) {
    console.log("data", data)
    const saltRounds = 10;
    let p1 = await bcrypt.hash(data.body.password, saltRounds)
    let newUser = {
        firstName: data.body.firstName,
        lastName: data.body.lastName,
        username: data.body.userName,
        email: data.body.email,
        password: p1,
    }
    try {
        let user = await User.findOne({email: newUser.email})
        if (user) {
            return {error: "User already exists, please login"}
        }
        else {
            console.log("user not found, creating")
            let user = await User.create(newUser)
            return {id:user._id, firstName: user.firstName, lastName: user.lastName, username: user.userName, image: user.image}
        }
    } catch (error) {
        console.error("Something went wrong, try again later")   
    }
}

async function profilePictureUpdate(newData) {
    try {
        let user = await User.findById(newData.id)
        if (user) {
            user.image = newData.image
            user.save()
            return user.image
        }
        else {
            return {error: "There was a problem uploading your picture, please try again in a bit"}
        }
    } catch (error) {
        return {error: error}
    }
}
    

async function getProfilePicture(userId) {
    try {
        let user = await User.findById(userId)
        if (user) {
            return user.image
        }
        else {
            return {error: "Ran into trouble, try refreshing the page"}
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    googleUserCheck, 
    manaulUserCheck,
    newSignUp,
    profilePictureUpdate, 
    getProfilePicture
}