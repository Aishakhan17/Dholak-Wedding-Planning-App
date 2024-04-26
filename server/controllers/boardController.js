const Board = require("../models/Board")
const User = require("../models/User")
const mongoose = require("mongoose")


async function createBoard(newBoard) {
    try {
        let board = await Board.create(newBoard)
        if (board) {
            let user = await User.findById(newBoard.owner)
            user.boards.push(board)
            user.save()
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
        let owner = await User.findById(id).populate({
            path: "boards",
            model: "Board",
        }).exec()
        

        if (owner) {
            let boards = owner.boards
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
        .populate("images")
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

async function addImages(id, image) {
    try {
        const board = await Board.findById(id)
        if (board) {
            board.images.push(image)
            board.save()
            return board.images
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
    getPublicBoardData,
    addImages
}