const Board = require("../models/Board")
const List = require("../models/List")
const Card = require("../models/Card")
const mongoose = require("mongoose")


async function createList(boardId, listTitle) {
    let newList = {
        board: boardId,
        title: listTitle
    }
    let board = await Board.findById(boardId)
    try {
        let list = await List.create(newList)
        if (list) {
            console.log(list)
            board.lists.push(list)
            board.save()
            return list
        } 
    } catch (error) {
        return error
    }
}

async function getBoardLists(boardId) {
    try {
        let board = await Board.findById(boardId).populate({
            path: "lists",
            model: "List"
        })

        if (board) {
            return board.lists
        }
    } catch (error) {
        
    }
}


module.exports = {
    createList,
    getBoardLists
}