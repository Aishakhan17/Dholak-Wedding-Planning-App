const Board = require("../models/Board")
const User = require("../models/User")
const mongoose = require("mongoose")


async function createBoard(newBoard) {
    // console.log("create board", newBoard)
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
    const id = data.user.data.id
    let owner = await User.findById(id)
    let newOwner = {firstName: owner.firstName, lastName: owner.lastName, id: owner._id}
    let boards = await Board.find({owner: data.user.data.id}).populate("owner", "userName").exec()

    if (boards) {
        return boards
    } 
    else {
        return {error: "There was a problem fetching boards"}
    }

}

async function getBoardData(id) {
    const data = await Board.findById(id)
    if (data) {
        return data
    }
    else {
        return {"error": "trouble loading board"}
    }
}

async function getPublicBoardData(id) {
    var result = []
    const data = await Board.find({private: false}).populate("owner", "userName").exec()
    // console.log("data", data)
    Object.keys(data).map((i) => {
        if (data[i].owner._id.toString() !== id) {
            result.push(data[i])
        }
    })
    return result
}

module.exports = {
    createBoard,
    getUserBoards,
    getBoardData, 
    getPublicBoardData
}