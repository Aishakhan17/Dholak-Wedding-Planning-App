import React, { useEffect, useState } from 'react'
import { useUpdate } from '../../utils/Context'
import Navbar from "../../components/Navbar"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import noImg from "../../assets/noImg.png"
import YourBoards from '../../components/YourBoards'


const Profile = () => {
    let [user, setUser] = useState([])    
    // const _id = useParams()
    const currentUser = useUpdate().user.data.id
    const id = useParams().id
    console.log("currentUser", currentUser, "user", user)

    useEffect(() => {
        let result = fetchUserDetails()  
        result.then((result) => setUser(result.data))
    }, [])

    async function fetchUserDetails() {
        let userDetails = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/user`, {
                id,
            }
        )
        return userDetails
    }
    // console.log(user)
    return (
        <div className='h-full min-h-screen mx-auto w-5/6'>
            <Navbar />
            <div className="mt-16 mx-auto grid grid-cols-[320px_minmax(400px,1200px)]">
                <div className="bg-foreground bg-opacity-80 h-fit min-h-screen flex flex-col mx-auto p-10 rounded-md">
                    {user.image
                    ? <img
                        className="h-36 w-36 rounded-full self-center justify-center" 
                            src={`${user.image}`}
                    />
                    : <img
                        className="h-36 w-36 rounded-full self-center justify-center" 
                            src={noImg}
                    />   
                    }
                    <p className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white self-center justify-center">{user.firstName} {user.lastName}
                    <p className="mt-2 text-center text-xs leading-2 tracking-tight text-white self-center justify-center">{user.email}</p>
                    </p>
                </div>
                <div className='bg-foreground bg-opacity-80 h-fit min-h-screen'>
                    {currentUser === user.id 
                        ? <div>
                            <YourBoards />
                        </div>
                        : <div>
                            <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white self-center justify-center">Nothing to see here</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile