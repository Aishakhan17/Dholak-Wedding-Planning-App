import React, { useEffect, useState } from 'react'
import { useUpdate } from '../../utils/Context'
import Navbar from "../../components/Navbar"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import noImg from "../../assets/noImg.png"

const Profile = () => {
    let [user, setUser] = useState([])    
    // const _id = useParams()
    const id = useParams().id
    console.log(id)

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
    console.log(user)
    return (
        <div>
            <Navbar />
            <div className="mt-10 mx-auto grid grid-cols-[800px_minmax(1000px,_2fr)] gap-x-20 gap-y-10 w-screen">
                <div className=" flex flex-col">
                    {user.image
                    ? <img
                        className="h-10 w-10 rounded-full self-center justify-center" 
                            src={`${user.image}`}
                    />
                    : <img
                        className="h-36 w-36 rounded-full self-center justify-center" 
                            src={noImg}
                    />   
                    }
                    <p className="mt-10 ml-10 text-center text-2xl font-bold leading-9 tracking-tight text-white self-center justify-center">{user.firstName} {user.lastName}
                    </p>
                </div>
                <div className="flex flex-col">
                    <h6 className="ml-10 text-center text-2xl font-bold leading-9 tracking-tight text-white self-start justify-center">Recent Activity</h6>
                </div>
            </div>
            {/* <h6 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white self-start justify-center">Recent Activity</h6> */}
        </div>
    )
}

export default Profile