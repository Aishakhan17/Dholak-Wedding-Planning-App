import { useState, useEffect } from 'react'
import { useUpdate } from '../utils/Context'
import axios from 'axios'
import Accordion from './Accordion'
import Loading from './Loading'
import { Buffer } from 'buffer'

const BoardSideNav = ({cover, title, id, participants}) => {
    const [accordionOpen, setAccordionOpen] = useState(false)
    const [boards, setBoards] = useState([])
    const {user} = useUpdate()
        
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
            // console.log("userBoards", userBoards, typeof userBoards)
            return userBoards    
        }
    }


    return (
        <div className="bg-white bg-opacity-90 h-screen rounded-md">
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
                                <img src={"data:image/jpg;base64,"+cover} className='h-96 mx-auto pt-5'/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='ml-5 mt-5 mb-2 p-1;'>
                <Accordion title="Members" data={participants}/>
            </div>
            <div className='ml-5 mb-2 p-1'>
                <Accordion title="Boards" data={boards}/>
            </div>
            {/* <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a> */}
        </div>
    )
}

export default BoardSideNav