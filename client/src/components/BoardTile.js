import React, { useEffect, useState } from 'react'
import { useUpdate } from '../utils/Context'
import axios from 'axios'
import Loading from './Loading'
import moment from "moment"

const BoardTile = ({title, cover, owner, createdAt, id}) => {
    // console.log(cover, btoa(cover))
    // const [isLoading, setIsLoading] = useState(false)
    // const [boards, setBoards] = useState([])
    // // const boards = []
    // const {user} = useUpdate()
    // // let userBoards = []

    // useEffect(() => {
    //     let isCancelled = false
    //     if (!isCancelled) {
    //         const result = fetchBoard()
    //         result.then((result) => {setBoards(result.data)}
    //     )
    //     }
    //     // console.log("boards", boards)
    //     return () => {
    //         isCancelled = true
    //     }
    // }, [])

    // async function fetchBoard() {
    //     setIsLoading((current) => !current)
    //     const userBoards = await axios.post(
    //         `${process.env.REACT_APP_API_URL}/boards/get-boards`, {
    //             user,
    //         }, {'X-Requested-With': 'XMLHttpRequest'}
    //     )
    //     if (userBoards.status === 200) {
    //         setIsLoading((current) => !current)
    //         // console.log("userBoards", userBoards, typeof userBoards)
    //         return userBoards    
    //     }
    // }
    // console.log("boards", boards, typeof boards, Object.keys(boards).length)
    // if (isLoading) {
    //     return (
    //         <Loading />
    //     )
    // }
    return (
        <div className='flex flex-col w-44'>
            <div className='flex flex-col'>
                <img src={cover}/>
                <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"><a href={`/board/${id}`}>{title}</a></h4>
                <div className='flex flex-row'>
                    <p className="mt-10 text-center text-xs font-bold leading-9 tracking-tight text-white">Created by {owner}</p>
                    <p className="mt-10 text-center text-xs font-bold leading-9 tracking-tight text-white">{moment(createdAt).format("MMM Do YYYY")}</p>
                    {/* <p className="mt-10 text-center text-xs font-bold leading-9 tracking-tight text-white">{id}</p> */}
                </div>
            </div>
        </div>
    )
}

export default BoardTile