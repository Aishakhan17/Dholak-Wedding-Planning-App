import React, { useDebugValue, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Board = () => {
    let [isLoading, setIsLoading] = useState(false)
    let { id } = useParams()
    console.log(id)
    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            const result = fetchBoardData()
        //     result.then((result) => {setBoards(result.data)}
        // )
        }
        // console.log("boards", boards)
        return () => {
            isCancelled = true
        }
        }, [])

        async function fetchBoardData() {
            setIsLoading((current) => !current)
            let boardData = await axios.post(
                `${process.env.REACT_APP_API_URL}/boards/board`, {id}
            )
            console.log(boardData)
        }
    return (
        <div>
            <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">{boardData.data.title}</h4>
        </div>
    )
}

export default Board