import axios from 'axios'
import {useEffect, useState} from 'react'

const ListAndCards = ({boardId}) => {
    const [lists, setLists] = useState([])
    let [active, setActive] = useState(false)
    
    async function createList(event) {
        event.preventDefault()
        let listTitle = event.target[0].value
        let result = await axios.post(
            `${process.env.REACT_APP_API_URL}/lists/create-list`, {boardId, listTitle}, 
            {crossdomain: true},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        let updatedLists = getLists()
        updatedLists.then((updatedLists) => setLists(updatedLists.data))
        updatedLists.then(setActive((current) => !current))
    }

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            const result = getLists()
            result.then((result) => {
                setLists(result.data)
            })
            // handleListUpdate(result)
        }
        return () => {
            isCancelled = true
        }
        }, [])

    async function getLists() {
        let boardLists = await axios.post(
            `${process.env.REACT_APP_API_URL}/lists/get-lists`,
            {boardId},
            {crossdomain: true},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        console.log("boardLists", boardLists)
        if (boardLists.status === 200) {
            return boardLists
        }
    }


    async function handleBlur() {
        setActive((current) => !current)
    }
    return (
        <div className='flex flex-row flex-wrap justify-start'> {/**className="flex flex-row flex-wrap justify-start" */}
            {lists.length > 0 
                ? <div className='flex flex-row flex-wrap justify-between'>
                    {Object.keys(lists).map((i) => {
                        return (
                            <div className='mt-5 h-fit w-64 min-w-48 bg-card bg-opacity-80 rounded-md justify-center'>
                                <div className="flex flex-row justify-between p-1">
                                    <h4 className='text-center text-xl font-bold leading-9 tracking-tight text-white self-center p-1'>{lists[i].title}</h4>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                    </svg>
                                </div>
                                <div className='w-full flex flex-row justify-evenly p-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white self-center justify-center">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <button className='text-white text-center justify-center self-center'>Add new card</button>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                : <div></div>
            }
            <div className='mt-5 h-fit w-64 min-w-48 bg-card bg-opacity-80 rounded-md'>
                    {!active 
                        ?   <div className='w-full flex flex-row justify-evenly p-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white self-center justify-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <button className='text-white text-center justify-center self-center' onClick={handleBlur}>Create a List..</button>
                            </div>
                        :   <div className='w-full p-3' onMouseLeave={handleBlur}> 
                                <form
                                    onSubmit={createList}
                                > 
                                    <label 
                                        htmlFor='boardImage'
                                        className="block text-m font-medium leading-6 text-white text-center"
                                    >
                                        Add List Title
                                    </label>
                                    <input type="text" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6" placeholder='Enter list title. Example pending'
                                    // onBlur={handleBlur}    
                                    />
                                    <button type="submit" className='mt-2 text-foreground bg-orange hover:bg-opacity-90 w-2/5 p-1 text-center justify-center self-center rounded-md'>Add List</button>
                                </form>
                            </div>
                    }
                </div>
        </div>
    )
}

export default ListAndCards