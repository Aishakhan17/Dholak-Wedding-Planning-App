import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useUpdate } from '../../utils/Context'
import BoardTile from '../../components/BoardTile'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import BoardForm from '../../components/BoardForm';
import axios from 'axios';
import Loading from '../../components/Loading';
import { Buffer } from 'buffer';

const YourBoard = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [boards, setBoards] = useState([])
    const [otherBoards, setOtherBoards] = useState([])
    const {user} = useUpdate()
    const id = user.data.id

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            const result = fetchBoards()
            result.then((result) => {setBoards(result.data)}
        )
        }
        // console.log("boards", boards)
        return () => {
            isCancelled = true
        }
        }, [])

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            const publicResult = fetchPublicBoards()
            publicResult.then((publicResult) => {setOtherBoards(publicResult.data)}
        )
        }
        return () => {
            isCancelled = true
        }
        }, [])

    async function fetchBoards() {
        setIsLoading((current) => !current)
        const userBoards = await axios.post(
            `${process.env.REACT_APP_API_URL}/boards/get-boards`, {
                user,
            },
            {crossdomain: true},
            {headers: {
                "Content-Type": "application/json"
            }}
        )
        if (userBoards.status === 200) {
            // console.log("userBoards", userBoards, typeof userBoards)
            setIsLoading((current) => !current)
            return userBoards    
        }
    }

    async function fetchPublicBoards() {
        const publicBoards = await axios.post(
            `${process.env.REACT_APP_API_URL}/boards/get-public-boards`, {
                id
            }
        )

        if (Object.keys(publicBoards.data).length !== 0) {
            return publicBoards
        } 
    }

    // console.log("boards", boards)
    console.log("otherboards", otherBoards)
    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <Navbar />
            <div className='mt-20'>
                <div className='flex flex-col'> 
                    <a className='self-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-10 mb-0 w-8 h-8 self-center justify-center hover:opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </a>
                    <Popup 
                        contentStyle={{width: "33%", marginTop: "15rem", marginLeft: "auto", marginRight: "auto", opacity: "97%"}}
                        trigger={<button className='mt-2 text-center text-xl font-bold leading-9 tracking-tight text-white hover:text-orange-400 self-center justify-center'>Create a new Board</button> } 
                        position="center-center"
                        >
                            <BoardForm />
                    </Popup>
                </div>
            </div>
            <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Here are your boards, {user.data.firstName}</h4>
            
            <div className='mt-10 mb-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 px-10 md:grid-cols-2 place-items-center'>
                {Object.keys(boards).map((i,j) => {
                    let cover = Buffer.from(boards[i].cover.data.data, "binary").toString('base64')
                    return (
                        <div className='self-center justify-center'>
                            <BoardTile key={j} cover={"data:image/jpg;base64,"+cover} title={boards[i]["title"]} ownerUserName={boards[i]["owner"].userName} ownerId={boards[i]["owner"]._id} createdAt={boards[i]["createdAt"]} boardId={boards[i]._id}/>
                        </div>
                        
                        )
                    }
                )}
            </div>
            <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Other boards we thought you might be interested in!</h4>
            
            <div className='mt-10 mb-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 px-10 md:grid-cols-2 place-items-center'>
                {Object.keys(otherBoards).map((i, j) => {
                    let cover = Buffer.from(otherBoards[i].cover.data.data, "binary").toString('base64')
                    return (
                        <div className='self-center justify-center'>
                            <BoardTile key={j} cover={"data:image/jpg;base64,"+cover} title={otherBoards[i]["title"]} ownerUserName={otherBoards[i]["owner"].userName} ownerId={otherBoards[i]["owner"]._id} createdAt={otherBoards[i]["createdAt"]} id={otherBoards[i]._id}/>
                        </div>
                        
                        )
                })}
            </div>
        </div>
    )
}

export default YourBoard