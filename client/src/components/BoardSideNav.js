import { useState, useEffect } from 'react'
import { useUpdate } from '../utils/Context'
import axios from 'axios'
import Accordion from './Accordion'
import Loading from './Loading'
import Popup from "reactjs-popup";
import AddMembers from "./AddMembers";
import { Buffer } from 'buffer'



const BoardSideNav = (boardId) => {
    const [boards, setBoards] = useState([])
    let [title, setTitle] = useState("")
    let [cover, setCover] = useState("")
    let [description, setDescription] = useState("")
    let [participants, setParticipants] = useState([])
    let [isLoading, setIsLoading] = useState(false)
    const {user} = useUpdate()

    function participantsChange(updatedParticipants) {
        setParticipants(updatedParticipants)
        console.log("participants", participants)
    }
        

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            const boardResult = fetchBoards()
            boardResult.then((boardResult) => {setBoards(boardResult.data)}
            )
        }
        return () => {
            isCancelled = true
        }
        }, [])

    async function fetchBoards() {
        const userBoards = await axios.post(
            `${process.env.REACT_APP_API_URL}/boards/get-boards`, {
                user,
            }, {'X-Requested-With': 'XMLHttpRequest'}
        )
        if (userBoards.status === 200) {
            return userBoards    
        }
    }


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
            // result.then((result) => console.log("result", result.data))
        }
        return () => {
            isCancelled = true
        }
        }, [])

    async function fetchBoardData() {
        setIsLoading((current) => !current)
        const boardData = await axios.post(
            `${process.env.REACT_APP_API_URL}/boards/board`, {
                boardId},
                {'X-Requested-With': 'XMLHttpRequest'}
        )
        if (boardData.status === 200) {
            setIsLoading((current) => !current)
            return boardData
        }
    }
    
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="bg-white bg-opacity-90 max-h-content min-h-screen rounded-md">
            <div>
                <a href='/your-boards'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-black pt-3 ml-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </a>
            </div>
            <h4 className="mt-5 ml-5 text-left text-xl font-bold leading-9 tracking-tight text-gray-800 self-start justify-start">{title}</h4>
            <div>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background place-items-center">
                                <img src={"data:image/jpg;base64,"+cover} className='h-80 mx-auto mt-10 rounded-md'/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='ml-5 mt-5 mb-2 p-1'>
                <ul>Members</ul>
                {Object.keys(participants).map((i) => {
                    return (
                        <div className='mt-3'>
                            <img/>
                            <li className='flow-root ml-2 text-sm'><a href={`/profile/${participants[i]._id}`}>{participants[i].firstName} {participants[i].lastName}</a></li>
                        </div>
                    )
                })}
                    <div className='flex flex-row justify-start'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 self-center justify-center">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <Popup 
                            contentStyle={{width: "40%", position: "absolute", marginTop: "-20%", marginLeft: "50%", justifySelf: "center", alignContent: "center", height: "fit-content", opacity: "90%"}}
                            trigger={<span><button className='ml-3 text-center text-sm leading-9 tracking-tight text-gray-800 hover:text-orange-400 self-center justify-center'>Add Members</button></span>} 
                            position="center-right"
                            >
                            <AddMembers boardId={boardId} participants={participants} participantsChange={participantsChange}/>
                        </Popup>
                    </div>
            </div>
            <div className='ml-5 mb-2 p-1'>
                <Accordion title="Boards" data={boards} boardId={boardId}/>
            </div>
            {/* <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a> */}
        </div>
    )
}

export default BoardSideNav