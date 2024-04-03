const Board = require("../models/Board")
const User = require("../models/User")
const mongoose = require("mongoose")


async function createBoard(newBoard) {
    console.log("create board", newBoard)
    try {
        let board = await Board.create(newBoard)
        console.log("board", board)
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
    // console.log("data blah", data, "data.user.id", data.user.id)
    const owner = data.user.data.id
    // console.log("owner", owner, "data", data, typeof owner)
    let boards = await Board.find({owner: owner})
    // console.log("controler", boards)
    
    if (boards) {
        return boards
    } 
    else {
        return {error: "There was a problem fetching boards"}
    }

}

async function getBoardData(id) {
    const data = await Board.findById(id)
    // console.log("data", data)
    if (data) {
        return data
    }
    else {
        return {"error": "trouble loading board"}
    }
}

module.exports = {
    createBoard,
    getUserBoards,
    getBoardData
}