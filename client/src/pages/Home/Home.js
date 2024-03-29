// import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useUpdate } from '../../utils/Context'

const Home = () => {
    const {user} = useUpdate()
    console.log(user.data)

    
    return (
    <div className=''>
        <Navbar />
        <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Hello {user.data.firstName}</h4>
    </div>
    )
}

export default Home