import React from 'react'
import { useUpdate } from '../../utils/Context'
import Navbar from "../../components/Navbar"

const Profile = (id) => {
    const {user} = useUpdate()    
    console.log(user.data.firstName)
    return (
        <div>
            <Navbar />
            <div className="mt-10 mx-auto grid grid-cols-[800px_minmax(1000px,_2fr)] gap-x-20 gap-y-10 w-screen">
                <div className=" flex flex-col">
                    <img
                        className="h-30 w-30 rounded-full self-center justify-center" 
                            src={`${user.data.image}`}
                    />
                    <p className="mt-10 ml-10 text-center text-2xl font-bold leading-9 tracking-tight text-white self-center justify-center">{user.data.firstName} {user.data.lastName}
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