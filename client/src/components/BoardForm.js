import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUpdate } from '../utils/Context'



const BoardForm = () => {
    const [isLoading, setIsLoading] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const {user} = useUpdate()
    const navigate = useNavigate()

    const handleBoardCreation = async (event) => {
        event.preventDefault()
        // console.log(event)
        let title = await event.target[0].value 
        let description = await event.target[1].value
        let cover = await event.target[2].files[0]
        let owner = await user.data.id
        console.log(title, description, cover, owner)
        
        const myFormData = new FormData()

        myFormData.append("title", title)
        myFormData.append("description", description)
        myFormData.append("cover", cover)
        myFormData.append("owner", owner)

        const boardStatus = await axios.post(
            `${process.env.REACT_APP_API_URL}/boards/create`, myFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                'X-Requested-With': 'XMLHttpRequest'
            },
        )
        console.log("boardStatus", boardStatus)

        if ("error" in boardStatus) {
            setErrorMessage(boardStatus.error)
        }
        else {
            navigate(`/board/${boardStatus.data._id}`)
        }

    }
    return (
        <div className="bg-gray-900 bg-opacity-95 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"> 
            <div className='self-start pl-3 sm:mx-auto sm:w-full sm:max-w-sm'>
                <a className="block text-sm font-medium leading-6 text-white" href="/your-boards">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white self-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </a>
                <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Create Board</h4>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    enctype="multipart/form-data"
                    onSubmit={handleBoardCreation}
                >
                    <div>
                        <label 
                            htmlFor='title'
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Board Title
                        </label>
                        <div>
                            <input 
                                id="title"
                                name="title"
                                type="text"
                                required
                                autoComplete='Board Title'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label 
                            htmlFor='description'
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Description
                        </label>
                        <div>
                            <textarea 
                                id="description"
                                name="description"
                                type="text"
                                autoComplete='description'
                                placeholder=" optional"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label 
                            htmlFor='cover'
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Cover Picture
                        </label>
                        <div>
                            <input 
                                id="cover"
                                name="cover"
                                type="file"
                                autoComplete='cover'
                                className="block rounded-md border-0 py-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-orange-400 hover:bg-opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Create
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default BoardForm