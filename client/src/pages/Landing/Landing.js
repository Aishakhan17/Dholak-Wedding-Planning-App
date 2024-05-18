import React from 'react'
import Navbar from "../../components/Navbar"
import ImageCarousel from '../../components/ImageCarousel'

const Landing = () => {

    let images = []
    return (
        <div className='h-full min-h-screen mx-auto w-5/6'>
            <Navbar />
            <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">No Panic at the Dholak</h4>
            <div className='justify-center'>
                <ImageCarousel images={images}/>
            </div>
            <div className='mt-10'>
                <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Why use a wedding planner?</h4>
            </div>
        </div>
    )
}

export default Landing