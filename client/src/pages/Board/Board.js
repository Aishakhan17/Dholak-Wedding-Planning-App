import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Buffer } from 'buffer'
import Loading from '../../components/Loading';
import BoardSideNav from '../../components/BoardSideNav';
import Navbar from '../../components/Navbar'


const Board = () => {
    let [isLoading, setIsLoading] = useState(false)
    let { id } = useParams()
    let [title, setTitle] = useState("")
    let [cover, setCover] = useState("")
    let [description, setDescription] = useState("")
    let [participants, setParticipants] = useState([])

    // console.log(id)
    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            const result = fetchBoardData()
            result.then((result) => {
                setTitle(result.data.title)
                setDescription(result.data.description)
                setCover(Buffer.from(result.data.cover.data.data, "binary").toString("base64"))
                setParticipants(result.data.participants)
            })
        }
        return () => {
            isCancelled = true
        }
        }, [])

    async function fetchBoardData() {
        setIsLoading((current) => !current)
        const boardData = await axios.post(
            `${process.env.REACT_APP_API_URL}/boards/board`, {
                id,},
                {'X-Requested-With': 'XMLHttpRequest'}
        )
        if (boardData.status === 200) {
            setIsLoading((current) => !current)
            return boardData
        }
    }
    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {
        return (
        // style={{"--image-url": `url(${"data:image/jpg;base64,"+cover})`}} className="bg-[image:var(--image-url)] bg-opacity-10 bg-cover"
        <div className='w-screen'> 
            <Navbar />
            <div className='mx-auto grid  grid-cols-[300px_minmax(600px,_1fr)_400px] gap-x-5 gap-y-10 ab'> 
                <div> 
                    {/* <img src={"data:image/jpg;base64,"+cover} className='mt-10 mx-auto self-center justify-center h-3/5 place-items-center opacity-15' />
                    <p className="mt-24 text-2xl font-bold leading-9 tracking-tight text-white text-center">{description}</p> */}
                    <BoardSideNav cover={cover} title={title} id={id} participants={participants} description={description}/>
                </div>
                <div>
                    {/* <h4 className="mt-24 text-left text-2xl font-bold leading-9 tracking-tight text-white self-start justify-start">{title}</h4> */}
                </div>
                <div>
                    {/* <p className="mt-24 text-2xl font-bold leading-9 tracking-tight text-white self-start justify-start">Members</p> */}
                </div>  
            </div>
        </div>
    )
    }
}

export default Board