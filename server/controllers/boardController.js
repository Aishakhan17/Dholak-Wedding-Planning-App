const Board = require("../models/Board")
const User = require("../models/User")
const Image = require("../models/Images")
const mongoose = require("mongoose")


async function createBoard(newBoard) {
    try {
        let board = await Board.create(newBoard)
        if (board) {
            // let user = await User.findById(newBoard.owner)
            // user.boards.push(board)
            // user.save()
            return board
        } 
        else {
            return {error: "Couldn't create board, please try again"}
        }
    } catch (error) {
        return error
    }
}

async function getUserBoards(data) {
    try {
        const id = data.user.data.id
        let boards = await Board.find({owner: id})

        if (boards) {
            return boards
        } 
        else {
            return {error: "There was a problem fetching boards"}
        }
    } catch (error) {
        return error
    }

}

async function getBoardData(id) {
    try {
        const data = await Board.findById(id).populate({
        path: "participants",
        model: "User",
        select: "firstName lastName _id"
        })
        .exec()
        if (data) {
            return data
        }
        else {
            return {error: "trouble loading board"}
        }
    } catch (error) {
        return error    
    }
}

async function getBoardImages(id) {
    try {
        let images = await Image.find({board: id})
        if (images) {
            return images
        }
    } catch (error) {
        return error
    }
}

async function getPublicBoardData(id) {
    var result = []
    try {
        const data = await Board.find({private: false}).populate({
        path: "owner",
        model: "User",
        select: "firstName lastName _id image"
        }).exec()
        Object.keys(data).map((i) => {
            if (data[i].owner._id.toString() !== id) {
                result.push(data[i])
            }
        })
        return result
    } catch (error) {
        return error
    }
}

async function addImages(boardId, newImage) {
    try {
        let image = await Image.create(newImage)
        console.log("created", image)
        if (image) {
            let boardImages = await Image.find({board: boardId})
            return boardImages
        }
        else {
            return {error: "There was an issue uploading the picture, try again"}
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    createBoard,
    getUserBoards,
    getBoardData, 
    getBoardImages,
    getPublicBoardData,
    addImages
}