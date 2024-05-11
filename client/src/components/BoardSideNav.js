import Accordion from './Accordion'
import Popup from "reactjs-popup";
import AddMembers from "./AddMembers";
import { useUpdate } from '../utils/Context';


const BoardSideNav = ({boardId, title, participants, description, cover, participantsChange, boards, owner}) => {
    const { user } = useUpdate()
    const contentStyle = {marginLeft: "auto", marginRight: "auto", width: "50%", minWidth: "content", height: "content", minHeight: "20%"}

    if (user.data.id === owner) {
        return (
            <div className="bg-foreground bg-opacity-80 h-fit min-h-full rounded-md mt-24">
                <div>
                    <a href='/home'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 pt-3 ml-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </a>
                </div>
                <h4 className="mt-5 ml-5 text-left text-xl font-bold leading-9 tracking-tight text-white self-start justify-start">{title}</h4>
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
                <div className='ml-2 mt-5 p-1 flex flex-row justify-start'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    <ul className='ml-2 text-sm font-bold leading-9 tracking-tight text-white'>Members</ul>
                </div>
                <div className='ml-2 mb-2 p-1 justify-start'>
                    {Object.keys(participants).map((i, j) => {
                        console.log("participants", participants[i])
                        return (
                            <div key={j} className='mt-1'>
                                <img/>
                                <li className='flow-root ml-2 text-sm leading-9 tracking-tight text-white'><a href={`/profile/${participants[i]._id}`}>{participants[i].firstName} {participants[i].lastName}</a></li>
                            </div>
                        )
                    })}
                        <div className='flex flex-row justify-start'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 self-center justify-center text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <Popup 
                                {...{contentStyle}}
                                position={"center-center"}
                                trigger={<span><button className='ml-3 text-center text-sm leading-9 font-semibold tracking-tight text-white hover:text-orange-400 self-center justify-center'>Add Members</button></span>} 
                                modal 
                                nested
                                >
                                <AddMembers boardId={boardId} participants={participants} participantsChange={participantsChange}/>
                            </Popup>
                        </div>
                </div>
                <div className='mb-2 p-1'>
                    <Accordion title="Boards" data={boards} boardId={boardId}/>
                </div>
            </div>
        )        
    }
}

export default BoardSideNav