import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import BoardSideNav from '../../components/BoardSideNav';
import Navbar from '../../components/Navbar'


const Board = () => {
    let { id } = useParams()
    // console.log(id)
    let [isLoading, setIsLoading] = useState(false)

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {
        return (
        // style={{"--image-url": `url(${"data:image/jpg;base64,"+cover})`}} className="bg-[image:var(--image-url)] bg-opacity-10 bg-cover"
        <div className='w-screen'> 
            <Navbar />
            <div className='mx-auto grid  grid-cols-[300px_minmax(600px,_1fr)_400px] gap-x-5 gap-y-10 ab'> 
                <div> 
                    {/* <img src={"data:image/jpg;base64,"+cover} className='mt-10 mx-auto self-center justify-center h-3/5 place-items-center opacity-15' />
                    <p className="mt-24 text-2xl font-bold leading-9 tracking-tight text-white text-center">{description}</p> */}
                    <BoardSideNav boardId={id}/>
                </div>
                <div>
                    {/* <h4 className="mt-24 text-left text-2xl font-bold leading-9 tracking-tight text-white self-start justify-start">{title}</h4> */}
                </div>
                <div>
                    {/* <p className="mt-24 text-2xl font-bold leading-9 tracking-tight text-white self-start justify-start">Members</p> */}
                </div>  
            </div>
        </div>
    )
    }
}

export default Board